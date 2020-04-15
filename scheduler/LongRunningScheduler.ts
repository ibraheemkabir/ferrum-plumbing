import {Injectable} from "../ioc/Container";
import {RetryConfig, sleep} from "../utils/AsyncUtils";
import {ValidationUtils} from "../utils/ValidationUtils";
import {LoggerFactory} from "../logging/LoggerFactory";
import {Logger} from "../logging/Types";

export class FinishJobScheduleError extends Error { }

export class WrappedPromise<T> {
  private _result: T | undefined;
  private _error: Error | undefined;
  private _completed: boolean = false;
  private _started: boolean = false;
  constructor(private pFac: () => Promise<T>) {
    this.run = this.run.bind(this);
    this.result = this.result.bind(this);
    this.error = this.error.bind(this);
    this.completed = this.completed.bind(this);
    this.started = this.started.bind(this);
  }

  run(): Promise<T> {
    ValidationUtils.isTrue(!this._started, 'Job is already started.');
    this._started = true;
    return this.pFac().then(r => {
      this._result = r; this._completed = true; return r === undefined ? null : r;
    }).catch(e => { this._error = e; this._completed = true; return e; });
  }

  result(): T | undefined | null { return this._result; }
  error(): Error | undefined { return this._error; }
  completed() { return this._completed; }
  started() { return this._started; }
}

export interface LongRunningSchedulerOptions {
  repeatPeriod: number;
  runNewIfOldIsNotFinished: boolean;
  retry: RetryConfig;
  logErrors: boolean;
}

export interface Job {
  jobFactory: (r: any) => Promise<any>;
  retries: number;
  lastRun: number;
  lastResult: any;
  current: WrappedPromise<any>;
  options: LongRunningSchedulerOptions;
}

/**
 * To schedule long running Promises, and manage retries, failures.
 */
export class LongRunningScheduler implements Injectable {
  private jobs: Map<string, Job> = new Map();
  private _died: boolean = false;
  private _interval: any = 0;
  private readonly log: Logger;
  constructor(logger: LoggerFactory, private lookupDuration: number = 100) {
    this.log = logger.getLogger(LongRunningScheduler);
  }

  init() {
    this._interval = setInterval(this.intervalCall, this.lookupDuration);
  }

  schedulePeriodic<T>(name: string, jobFactory: (lastRes: T | undefined) => Promise<T>, options: LongRunningSchedulerOptions) {
    const current = new WrappedPromise(() => jobFactory(undefined));
    const j = {
      retries: 0,
      options,
      current,
      lastRun: Date.now(),
      lastResult: undefined,
      jobFactory,
    } as Job;
    current.run();
    this.jobs.set(name, j);
  }

  intervalCall = () => {
    /**
     * Check running jobs. Run them if both, the time is right and previous task is complete.
     * If job is failed for any reason, retry until retry is exhausted.
     * If job succeeded, run the next job, passing the result of previous.
     * If retries exhausted, die. No other jobs will run.
     */
    if (this._died) { return; }
    const now = Date.now();
    const keys = Array.from(this.jobs.keys());
    for (const k of keys) {
      const j = this.jobs.get(k)!;
      if (j.current.completed()) {
        if (!!j.current.error()) {
          const e = j.current.error()!;
          if (e instanceof FinishJobScheduleError) {
            this.log.debug('Job completed: ' + k);
            this.jobs.delete(k);
          } else {
            const message = 'Error running job "' + k + '": ' + e.message;
            this.log.debug(message);
            if (j.options.logErrors) {
              this.log.error(message, e);
            }
            if (j.retries >= j.options.retry.count) {
              this.die();
            } else if (now > (j.lastRun + j.options.repeatPeriod)) {
              //Retry.
              j.retries += 1;
              j.lastRun = now + j.options.retry.defaultTimeout || 0;
              this._run(j);
              this.log.debug('Retried a new job for number ' + j.retries + ': ' + k);
            }
          }
        } else {
          if (now > (j.lastRun + j.options.repeatPeriod)) {
            // Schedule a new job.
            j.lastResult = j.current.result();
            j.retries = 0;
            j.lastRun = Date.now();
            this._run(j);
            this.log.debug('Ran a new job for ' + k);
          }
        }
        // Pass if job is ongoing
      }
    }
  };

  private _run(j: Job) {
    const newJob = new WrappedPromise(() => j.jobFactory(j.lastResult));
    j.current = newJob;
    newJob.run();
  }

  died() {
    return this._died;
  }

  private die() {
    this._died = true;
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  static async runForever(scheduler: LongRunningScheduler, period: number) {
    while (!scheduler.died()) {
      await sleep(period);
    }
    throw new Error('Long running scheduler died prematurely.');
  }

  __name__(): string { return 'LongRunningScheduler'; }
}

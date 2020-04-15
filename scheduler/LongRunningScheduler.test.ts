import {RetryConfig, sleep} from "../utils/AsyncUtils";
import {FinishJobScheduleError, LongRunningScheduler, LongRunningSchedulerOptions} from "./LongRunningScheduler";
import {ConsoleLogger} from "../logging/BasicLoggers";
import {LoggerFactory} from "../logging/LoggerFactory";

const j1 = async (n: number | undefined) => {
  console.log('Running job 1 level ', n);
  await sleep(1000);
  throw new Error('ERROR');
};

const j2 = async (n: number | undefined) => {
  console.log('Running job 2 level ', n);
  if (n! > 15) {
    throw new FinishJobScheduleError();
  }
  return (n || 0) + 1;
};


const op1 = {
  retry: { count: 10 } as RetryConfig,
  logErrors: false,
  repeatPeriod: 100,
} as LongRunningSchedulerOptions;

const logF = new LoggerFactory(n => new ConsoleLogger(n));

test('Run two jobs for a while, fail until death', async function() {
  jest.setTimeout(100000);
  const runner = new LongRunningScheduler(logF, 10);
  runner.schedulePeriodic('Job1', j1, op1);
  runner.schedulePeriodic('Job2', j2, op1);
  runner.init();
  await LongRunningScheduler.runForever(runner, 10);
});
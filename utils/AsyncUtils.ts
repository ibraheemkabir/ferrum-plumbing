export interface RetryConfig {
  defaultTimeout: number,
  maxTimeout: number,
  count: number,
}

export const globalRetryConfig = {
  defaultTimeout: 300,
  maxTimeout: 600000, // 10 seconds
  count: 3,
} as RetryConfig;

export class RetryableError extends Error {}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(fun: () => Promise<T>) {
  return retryWithConf(globalRetryConfig, fun);
}

export async function retryWithConf<T>(conf: RetryConfig, fun: () => Promise<T>) {
  for(let i = 0; i < conf.count; i++) {
    try {
      const res = await fun();
      if (i > 0) {
        console.log(`Call succeeded after ${i} retries`);
      }
      return res;
    } catch (e) {
      if (e instanceof RetryableError) {
        // pass
        await sleep(
          Math.round(Math.random() * Math.min(conf.maxTimeout, conf.defaultTimeout * Math.pow(2, i))));
      } else {
        console.error('Retry failed all the attempts', i, e.message || e);
        throw e;
      }
    }
  }
}

export interface RetryConfig {
  defaultTimeout: number,
  count: number,
}

export const globalRetryConfig = {
  defaultTimeout: 300,
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
      return await fun();
    } catch (e) {
      if (e instanceof RetryableError) {
        // pass
        await sleep(conf.defaultTimeout * Math.pow(2, i));
      } else throw e;
    }
  }
}

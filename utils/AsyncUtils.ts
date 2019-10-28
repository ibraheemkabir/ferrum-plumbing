export const globalRetryConfig = {
  defaultTimeout: 300,
  count: 3,
};

export class RetryableError extends Error {}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(fun: () => Promise<T>) {
  for(let i = 0; i < globalRetryConfig.count; i++) {
    try {
      return await fun();
    } catch (e) {
      if (e instanceof RetryableError) {
        // pass
        await sleep(globalRetryConfig.defaultTimeout * Math.pow(2, i));
      } else throw e;
    }
  }
}

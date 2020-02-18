import { Injectable } from '../ioc/Container';

interface CacheItem {
  time: number;
  item: any;
  timeout?: number;
}

const CLEANUP_TIME= 300000; // 5 minutes

export class LocalCache implements Injectable {
  private readonly cache = new Map<string, any>();
  private lastCleanup = Date.now();
  async getAsync<T>(key: string, factory: () => Promise<T>, timeout?: number): Promise<T> {
    if (!this.cache.has(key)) {
      const res = await factory();
      this.set(key, res, timeout);
    }
    return  this.get<T>(key);
  }

  set<T>(key: string, item: T, timeout?: number) {
    this.cache.set(key, { time: Date.now(), item: item, timeout });
  }

  get<T>(key: string) {
    const res = this.cache.get(key);
    this.cleanup();
    return res ? res.item : res;
  }

  cleanup() {
    const now = Date.now();
    if ((now - this.lastCleanup) > CLEANUP_TIME) {
      const keys = Array.from(this.cache.keys());
      keys.forEach(k => {
        const val = this.cache.get(k) as CacheItem;
        if (val && val.timeout && ((now - val.time) > val.timeout)) {
          this.cache.delete(k);
        }
      });
    }
  }

  __name__(): string {
    return 'LocalCache';
  }
}

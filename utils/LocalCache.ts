import { Injectable } from '../ioc/Container';

export class LocalCache implements Injectable {
  private readonly cache = new Map<string, any>();
  async getAsync<T>(key: string, factory: () => Promise<T>): Promise<T> {
    if (!this.cache.has(key)) {
      const res = await factory();
      this.cache.set(key, res);
    }
    return this.cache.get(key);
  }

  __name__(): string {
    return 'LocalCache';
  }
}

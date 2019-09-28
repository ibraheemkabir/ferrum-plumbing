import { Injectable } from '../ioc/Container';
export declare class LocalCache implements Injectable {
    private readonly cache;
    getAsync<T>(key: string, factory: () => Promise<T>): Promise<T>;
    __name__(): string;
}
//# sourceMappingURL=LocalCache.d.ts.map
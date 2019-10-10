export interface StringStorage {
    getItem(key: string): Promise<string>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}
export interface JsonStorage {
    load(key: string): Promise<any>;
    save(key: string, val: any): Promise<void>;
    remove(key: string): Promise<void>;
}
//# sourceMappingURL=Storage.d.ts.map
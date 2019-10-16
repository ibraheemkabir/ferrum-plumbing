
export interface KeyValueStore {
    getItem<T>(k: string): Promise<T|undefined>;
    setItem<T>(k: string, value: T): Promise<void>;
    removeItem<T>(k: string): Promise<void>;
}

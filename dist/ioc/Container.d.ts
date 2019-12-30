export declare class ContainerError extends Error {
}
export interface Injectable {
    __name__(): string;
}
export interface LifecycleContext<T> {
    context: T;
}
export interface LifecycleParent<T> {
    getLifecycleContext(): LifecycleContext<T>;
}
export declare function makeInjectable(name: string, type: any): void;
export declare class Container {
    private static _containerId;
    private readonly __id;
    constructor();
    private catalog;
    private singleTons;
    private managed;
    private stack;
    registerModule(m: Module): Promise<void>;
    get<T>(type: any, container?: Container): T;
    getContext<T>(): () => LifecycleContext<T>;
    register<T>(type: any, factory: (c: Container) => T): void;
    registerSingleton<T>(type: any, factory: (c: Container) => T): void;
    registerManagedLifecycle<T>(type: any, factory: (c: Container) => T): void;
    registerLifecycleParent<LCT, T extends LifecycleParent<LCT>>(type: any, factory: (c: Container) => T): void;
    static _name(type: any): string;
}
export interface Module {
    configAsync(c: Container): Promise<void>;
}
//# sourceMappingURL=Container.d.ts.map
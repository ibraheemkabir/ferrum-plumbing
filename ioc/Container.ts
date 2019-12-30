
export class ContainerError extends Error { }

export interface Injectable {
  __name__(): string;
}

export interface LifecycleContext<T> {
  context: T;
}

export interface LifecycleParent<T> {
  getLifecycleContext(): LifecycleContext<T>;
}

export function makeInjectable(name: string, type: any): void {
  type.prototype.__name__ = () => name;
}

const UNDEFINED_VALUE = '__UNDEFINED_VALUE__';

export class Container {
  private catalog: any = {};
  private singleTons: any = {};
  private managed: any = {};
  private stack: Set<string> = new Set();

  async registerModule(m: Module) {
    await m.configAsync(this);
  }

  get<T>(type: any, container?: Container): T {
    const name = Container._name(type);
    container = container || this;
    if (!this.catalog[name]) {
      throw new ContainerError(`Type ${name} is not registered with the container`);
    }

    if (this.stack.has(name)) {
      throw new ContainerError(
          `Type ${name} is in a recursive definition loop: ${Array.from(this.stack)}`);
    }

    if (this.singleTons[name] && this.singleTons[name] !== UNDEFINED_VALUE) {
      return this.singleTons[name];
    }

    this.stack.add(name);
    const res = this.catalog[name](container) as any;
    this.stack.delete(name);

    if (this.singleTons[name]) {
      this.singleTons[name] = res;
    }

    return res;
  }

  getContext<T>(): LifecycleContext<T> {
    throw new Error('This context is not a lifecycle managed context');
  }

  register<T>(type: any, factory: (c: Container) => T): void {
    const name = Container._name(type);
    this.catalog[name] = factory;
  }

  registerSingleton<T>(type: any, factory: (c: Container) => T): void {
    const name = Container._name(type);
    this.catalog[name] = factory;
    this.singleTons[name] = UNDEFINED_VALUE;
  }

  registerManagedLifecycle<T>(type: any, factory: (c: Container) => T): void {
    const name = Container._name(type);
    this.catalog[name] = factory;
    this.managed[name] = UNDEFINED_VALUE;
  }

  registerLifecycleParent<LCT, T extends LifecycleParent<LCT>>(type: any, factory: (c: Container) => T): void {
    // Creates a wrapped container.
    const name = Container._name(type);
    const dis = this;
    class Wrapped extends Container {
      private lifecycleParent: LifecycleParent<LCT> | undefined = undefined;
      private lifecycleParentType: string = name;
      get<TT>(t: any): TT {
        const name = Container._name(t);
        if (name === this.lifecycleParentType) {
          if (!this.lifecycleParent) {
            this.lifecycleParent = super.get(t);
            return this.lifecycleParent! as any as TT;
          }
          throw new ContainerError('Loop detected when getting lifecycle parent');
        }

        if (dis.managed[name]) { // managed is registered outside but its value is managed inside
          if (!this.managed[name]) {
            this.managed[name] = dis.get(name);
          }
          return this.managed[name];
        }

        return dis.get(t, this);
      }

      getContext<TT>() {
        return this.lifecycleParent!.getLifecycleContext() as any as TT;
      }
    }
    this.catalog[name] = () => {
      const wrappedC = new Wrapped();
      wrappedC.register(type, factory);
      return wrappedC.get(name);
    }
  }

  static _name(type: any): string {
    if (typeof type === 'string') {
      return type;
    }
    if (!type.prototype.__name__) {
      throw new ContainerError(`Type ${type.toString()} does not implement Injectable `);
    }
    return type.prototype.__name__();
  }
}

export interface Module {
  configAsync(c: Container): Promise<void>;
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerError extends Error {
}
exports.ContainerError = ContainerError;
function makeInjectable(name, type) {
    type.prototype.__name__ = () => name;
}
exports.makeInjectable = makeInjectable;
const UNDEFINED_VALUE = '__UNDEFINED_VALUE__';
class Container {
    constructor() {
        this.catalog = {};
        this.singleTons = {};
        this.managed = {};
        this.stack = new Set();
    }
    registerModule(m) {
        return __awaiter(this, void 0, void 0, function* () {
            yield m.configAsync(this);
        });
    }
    get(type, container) {
        const name = Container._name(type);
        container = container || this;
        if (!this.catalog[name]) {
            throw new ContainerError(`Type ${name} is not registered with the container`);
        }
        if (this.stack.has(name)) {
            throw new ContainerError(`Type ${name} is in a recursive definition loop: ${Array.from(this.stack)}`);
        }
        if (this.singleTons[name] && this.singleTons[name] !== UNDEFINED_VALUE) {
            return this.singleTons[name];
        }
        this.stack.add(name);
        const res = this.catalog[name](container);
        this.stack.delete(name);
        if (this.singleTons[name]) {
            this.singleTons[name] = res;
        }
        return res;
    }
    getContext() {
        throw new Error('This context is not a lifecycle managed context');
    }
    register(type, factory) {
        const name = Container._name(type);
        this.catalog[name] = factory;
    }
    registerSingleton(type, factory) {
        const name = Container._name(type);
        this.catalog[name] = factory;
        this.singleTons[name] = UNDEFINED_VALUE;
    }
    registerManagedLifecycle(type, factory) {
        const name = Container._name(type);
        this.catalog[name] = factory;
        this.managed[name] = UNDEFINED_VALUE;
    }
    registerLifecycleParent(type, factory) {
        // Creates a wrapped container.
        const name = Container._name(type);
        const dis = this;
        class Wrapped extends Container {
            constructor() {
                super(...arguments);
                this.lifecycleParent = undefined;
                this.lifecycleParentType = name;
            }
            get(t) {
                const name = Container._name(t);
                if (name === this.lifecycleParentType) {
                    if (!this.lifecycleParent) {
                        this.lifecycleParent = super.get(t);
                        return this.lifecycleParent;
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
            getContext() {
                return this.lifecycleParent.getLifecycleContext();
            }
        }
        this.catalog[name] = () => {
            const wrappedC = new Wrapped();
            wrappedC.register(type, factory);
            return wrappedC.get(name);
        };
    }
    static _name(type) {
        if (typeof type === 'string') {
            return type;
        }
        if (!type.prototype.__name__) {
            throw new ContainerError(`Type ${type.toString()} does not implement Injectable `);
        }
        return type.prototype.__name__();
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map
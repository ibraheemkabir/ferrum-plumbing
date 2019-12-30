"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
class Counter {
    static next() {
        Counter.v += 1;
        return Counter.v;
    }
}
Counter.v = 1;
class Dep {
    constructor() {
        this.r = Counter.next();
    }
    print() {
        console.log('Dependency class', this.r);
    }
}
class Dep2 extends Dep {
    constructor(context) {
        super();
        this.context = context;
    }
    print() {
        console.log('Derived', this.context);
        super.print();
    }
}
class DeepDep {
    constructor(d1, d2, d3) {
        this.d1 = d1;
        this.d2 = d2;
        this.d3 = d3;
    }
    print() {
        console.log('Deep dep');
        this.d1.print();
        this.d2.print();
        this.d3.print();
    }
}
class LCP {
    constructor(depNorm, depManaged, deepDep) {
        this.depNorm = depNorm;
        this.depManaged = depManaged;
        this.deepDep = deepDep;
        this.rand = Math.random();
    }
    __name__() { return 'LCP'; }
    getLifecycleContext() {
        return {
            context: Counter.next().toString(),
        };
    }
    run() {
        this.depNorm.print();
        this.depManaged.print();
        this.deepDep.print();
    }
}
test('Test managed lifecycles', () => {
    const c = new Container_1.Container();
    c.register('Dep', () => new Dep());
    c.registerManagedLifecycle('Dep2', c => new Dep2(c.get('Dep')));
    c.registerSingleton('Dep3', () => new Dep());
    c.register('DeepDep', c => new DeepDep(c.get('Dep'), c.get('Dep2'), c.get('Dep3')));
    c.registerLifecycleParent('LCP', c => new LCP(c.get('Dep'), c.get('Dep2'), c.get('DeepDep')));
    console.log('First run');
    c.get('LCP').run();
    console.log('Second run');
    c.get('LCP').run();
});
//# sourceMappingURL=Container.test.js.map
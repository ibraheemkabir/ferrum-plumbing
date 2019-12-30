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
    constructor(context, ctx) {
        super();
        this.context = context;
        this.ctx = ctx;
    }
    print() {
        console.log('Derived', this.context, this.ctx().context);
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
    constructor(depNorm, depManaged, deepDep, deepDep2) {
        this.depNorm = depNorm;
        this.depManaged = depManaged;
        this.deepDep = deepDep;
        this.deepDep2 = deepDep2;
        this.rand = Counter.next().toString();
    }
    __name__() { return 'LCP'; }
    getLifecycleContext() {
        return ({
            context: this.rand,
        });
    }
    run() {
        this.depNorm.print();
        this.depManaged.print();
        this.deepDep.print();
        this.deepDep2.print();
    }
}
test('Test managed lifecycles', () => {
    const c = new Container_1.Container();
    c.register('Dep', c => new Dep());
    c.registerManagedLifecycle('Dep2', c => new Dep2(c.get('Dep'), c.getContext()));
    c.registerSingleton('Dep3', c => new Dep());
    c.register('DeepDep', c => new DeepDep(c.get('Dep'), c.get('Dep2'), c.get('Dep3')));
    c.register('DeepDep2', c => c.get('DeepDep'));
    c.registerLifecycleParent('LCP', c => new LCP(c.get('Dep'), c.get('Dep2'), c.get('DeepDep'), c.get('DeepDep2')));
    console.log('First run');
    c.get('LCP').run();
    console.log('Second run');
    c.get('LCP').run();
});
//# sourceMappingURL=Container.test.js.map
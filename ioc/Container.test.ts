import {Container, Injectable, LifecycleContext, LifecycleParent} from "./Container";

class Counter {
    static v = 1;
    static next() {
        Counter.v += 1;
        return Counter.v;
    }
}

class Dep {
    constructor() {
    }

    private r = Counter.next();
    print() {
        console.log('Dependency class', this.r);
    }
}

class Dep2 extends Dep {
    constructor(private context: string, private ctx: () => LifecycleContext<any>) { super(); }
    print() {
        console.log('Derived', this.context, this.ctx().context);
        super.print();
    }
}

class DeepDep {
    constructor(private d1: Dep, private d2: Dep, private d3: Dep) {}
    print() {
        console.log('Deep dep');
        this.d1.print();
        this.d2.print();
        this.d3.print();
    }
}

class LCP implements Injectable, LifecycleParent<string> {
    private rand: string;
    constructor(private depNorm: Dep, private depManaged: Dep, private deepDep: DeepDep, private deepDep2: DeepDep) {
        this.rand = Counter.next().toString();
    }
    __name__(): string { return 'LCP'; }
    getLifecycleContext(): LifecycleContext<string> {
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
    const c = new Container();
    c.register('Dep', c => new Dep());
    c.registerManagedLifecycle('Dep2', c => new Dep2(c.get('Dep'), c.getContext()));
    c.registerSingleton('Dep3', c => new Dep());
    c.register('DeepDep', c => new DeepDep(c.get('Dep'), c.get('Dep2'), c.get('Dep3')));
    c.register('DeepDep2', c => c.get('DeepDep'));
    c.registerLifecycleParent('LCP', c => new LCP(c.get('Dep'), c.get('Dep2'), c.get('DeepDep'), c.get('DeepDep2')));

    console.log('First run');
    c.get<LCP>('LCP').run();

    console.log('Second run');
    c.get<LCP>('LCP').run();
});
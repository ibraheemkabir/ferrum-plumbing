"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncUtils_1 = require("../utils/AsyncUtils");
const LongRunningScheduler_1 = require("./LongRunningScheduler");
const BasicLoggers_1 = require("../logging/BasicLoggers");
const LoggerFactory_1 = require("../logging/LoggerFactory");
const j1 = async (n) => {
    console.log('Running job 1 level ', n);
    await AsyncUtils_1.sleep(1000);
    throw new Error('ERROR');
};
const j2 = async (n) => {
    console.log('Running job 2 level ', n);
    if (n > 15) {
        throw new LongRunningScheduler_1.FinishJobScheduleError();
    }
    return (n || 0) + 1;
};
const op1 = {
    retry: { count: 10 },
    logErrors: false,
    repeatPeriod: 100,
};
const logF = new LoggerFactory_1.LoggerFactory(n => new BasicLoggers_1.ConsoleLogger(n));
test('Run two jobs for a while, fail until death', async function () {
    jest.setTimeout(100000);
    const runner = new LongRunningScheduler_1.LongRunningScheduler(logF, 10);
    runner.schedulePeriodic('Job1', j1, op1);
    runner.schedulePeriodic('Job2', j2, op1);
    runner.init();
    await LongRunningScheduler_1.LongRunningScheduler.runForever(runner, 10);
});
//# sourceMappingURL=LongRunningScheduler.test.js.map
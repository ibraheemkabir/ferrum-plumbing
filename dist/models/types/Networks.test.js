"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Networks_1 = require("./Networks");
test('Check legacy ids', function () {
    const net1 = Networks_1.Networks.for('ETHEREUM');
    const net2 = Networks_1.Networks.forChainId(1);
    console.log('Networks:', net1, net2);
});
//# sourceMappingURL=Networks.test.js.map
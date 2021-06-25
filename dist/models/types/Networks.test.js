"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Networks_1 = require("./Networks");
test('Check legacy ids', function () {
    const net1 = Networks_1.Networks.for('ETHEREUM');
    const net2 = Networks_1.Networks.forChainId(1);
    console.log('Networks:', net1, net2);
    const rinkeby = Networks_1.Networks.for('RINKEBY');
    const rinkebyById = Networks_1.Networks.forChainId(4);
    console.log('Rinky', rinkeby, rinkebyById);
    expect(rinkeby.chainId).toBe(4);
    expect(rinkebyById.chainId).toBe(4);
    const poly = Networks_1.Networks.for('POLYGON');
    const polyById = Networks_1.Networks.forChainId(137);
    expect(poly.chainId).toBe(137);
    expect(polyById.chainId).toBe(137);
});
//# sourceMappingURL=Networks.test.js.map
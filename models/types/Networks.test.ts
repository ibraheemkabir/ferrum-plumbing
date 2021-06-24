import { Networks } from "./Networks";

test('Check legacy ids', function() {
	const net1 = Networks.for('ETHEREUM');
	const net2 = Networks.forChainId(1);
	console.log('Networks:', net1, net2);
	const rinkeby = Networks.for('RINKEBY');
	const rinkebyById = Networks.forChainId(4);
	console.log('Rinky', rinkeby, rinkebyById);
	expect(rinkeby.chainId).toBe(4);
	expect(rinkebyById.chainId).toBe(4);
});
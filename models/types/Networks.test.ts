import { Networks } from "./Networks";

test('Check legacy ids', function() {
	const net1 = Networks.for('ETHEREUM');
	const net2 = Networks.forChainId(1);
	console.log('Networks:', net1, net2);
});
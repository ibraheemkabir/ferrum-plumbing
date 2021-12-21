// Chains downloaded from https://chainid.network/chains.json
import { panick } from '../../utils/ValidationUtils';
import chains from './Chains.json';

/*
	{
	  "name": "Ethereum Mainnet",
	  "chainId": 1,
	  "shortName": "eth",
	  "chain": "ETH",
	  "network": "mainnet",
	  "networkId": 1,
	  "nativeCurrency": {"name":"Ether","symbol":"ETH","decimals":18},
	  "rpc": ["https://mainnet.infura.io/v3/${INFURA_API_KEY}","wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}","https://api.mycryptoapi.com/eth","https://cloudflare-eth.com"],
	  "faucets": [],
	  "explorers": [{"name":"etherscan","url":"https://etherscan.io","standard":"EIP3091"}],
	  "infoURL": "https://ethereum.org"
	},
*/

export interface EthNetwork {
	id: string;
	displayName: string;
	baseSymbol: string;
	baseCurrency: string;
	chainId: number;
	explorer: string;
	testnet: boolean;
	defaultRpcEndpoint: string;
	chainLogoUri?: string;
	chainLogoBase64?: string;
}

export function updateLogoForNetwork(network: string, logoUri?: string, logoBase64?: string) {
	const net = Networks.for(network);
	net.chainLogoUri = logoUri || net.chainLogoUri;
	net.chainLogoBase64 = logoBase64 || net.chainLogoBase64;
}

function chainToEthNetwork(chain: any): EthNetwork {
	if (chain.chain === 'ETH') { chain.chain = 'ETHEREUM'; }
	let id = `${chain.chain.toUpperCase()}_${chain.network.toUpperCase()}`;

	// Backward compatiblity
	let cur = chain.nativeCurrency.symbol;
        let testnet = chain.network !== 'mainnet';
	if (id === 'MATIC_TESTNET') { id = 'MUMBAI_TESTNET'; cur = 'MATIC'; }
	if (id === 'ETHEREUM_MAINNET') { id = 'ETHEREUM'; }
	if (id === 'BSC_MAINNET') { id = 'BSC'; }
	if (id === 'BSC_CHAPEL') { id = 'BSC_TESTNET'; cur = 'BNB'; }
	if (id === 'MATIC_MAINNET') { id = 'POLYGON'; }
	if (id === 'ETHEREUM_RINKEBY') { id = 'RINKEBY'; cur = 'ETH'; chain.chainId = 4; }

	// Harmony special case
	if (chain.chainId === 1666700000) { id = 'HARMONY_TESTNET_0'; }
	if (chain.chainId === 1666700001) { id = 'HARMONY_TESTNET_1'; }
	if (chain.chainId === 1666700002) { id = 'HARMONY_TESTNET_2'; }
	if (chain.chainId === 1666700003) { id = 'HARMONY_TESTNET_3'; }
	if (chain.chainId === 1666600000) { id = 'HARMONY_MAINNET_0'; }
	if (chain.chainId === 1666600001) { id = 'HARMONY_MAINNET_1'; }
	if (chain.chainId === 1666600002) { id = 'HARMONY_MAINNET_2'; }
	if (chain.chainId === 1666600003) { id = 'HARMONY_MAINNET_3'; }

	return {
		id: id,
		displayName: chain.name,
		baseCurrency: `${id}:${cur}`,
		baseSymbol: cur,
		chainId: chain.chainId,
		explorer: ((chain.explorers || [])
			.filter((e: any) => e.standard === 'EIP3091')
			.map((e: any) => e.url) || [])[0] || '',
                testnet,
		defaultRpcEndpoint: (chain.rpc || []).find((r: string) => (r || '').indexOf('{') <= 0) || '',
	} as EthNetwork;
}


function byId(key: (k: EthNetwork) => any, items: EthNetwork[]): Map<string, EthNetwork> {
	const rv = new Map<string, EthNetwork>();
	items.forEach(i => {
		const k = key(i)?.toString();
		if (k && !rv.get(k)) {
			rv.set(k, i);
		}
	});
	return rv;
}

export class Networks {
	static CHAINS = chains.map(chainToEthNetwork);
	static CHAINS_BY_ID = byId(c => c.id, Networks.CHAINS);
	static CHAINS_BY_CHAIN_ID = byId(c => c.chainId, Networks.CHAINS);
	static for(id: string): EthNetwork {
		return this.CHAINS_BY_ID.get(id)! || panick(`Unsupported chain "${id}"`);
	}

	static forChainId(id: number): EthNetwork {
		return this.CHAINS_BY_CHAIN_ID.get(id.toString())! || panick(`Unsupported chain ID "${id}"`);
	}
}

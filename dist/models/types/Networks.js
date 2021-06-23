"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Chains downloaded from https://chainid.network/chains.json
const ValidationUtils_1 = require("../../utils/ValidationUtils");
const Chains_json_1 = __importDefault(require("./Chains.json"));
function chainToEthNetwork(chain) {
    if (chain.chain === 'ETH') {
        chain.chain = 'ETHEREUM';
    }
    let id = `${chain.chain.toUpperCase()}_${chain.network.toUpperCase()}`;
    // Backward compatiblity
    let cur = chain.nativeCurrency.symbol;
    if (id === 'MATIC_TESTNET') {
        id = 'MUMBAI_TESTNET';
        cur = 'MATIC';
    }
    if (id === 'ETHEREUM_MAINNET') {
        id = 'ETHEREUM';
    }
    if (id === 'BSC_MAINNET') {
        id = 'BSC';
    }
    if (id === 'BSC_CHAPEL') {
        id = 'BSC_TESTNET';
        cur = 'BNB';
    }
    if (id === 'POLYGON_MAINNET') {
        id = 'POLYGON';
    }
    if (id === 'ETHEREUM_RINKEBY') {
        id = 'RINKEBY';
        cur = 'ETH';
    }
    return {
        id: id,
        displayName: chain.name,
        baseCurrency: `${id}:${cur}`,
        baseSymbol: cur,
        chainId: chain.chainId,
        explorer: ((chain.explorers || [])
            .filter((e) => e.standard === 'EIP3091')
            .map((e) => e.url) || [])[0] || '',
    };
}
function byId(key, items) {
    const rv = new Map();
    items.forEach(i => {
        const k = key(i);
        if (k) {
            rv.set(key(i).toString(), i);
        }
    });
    return rv;
}
class Networks {
    static for(id) {
        return this.CHAINS_BY_ID.get(id) || ValidationUtils_1.panick(`Unsupported chain "${id}"`);
    }
    static forChainId(id) {
        return this.CHAINS_BY_CHAIN_ID.get(id.toString()) || ValidationUtils_1.panick(`Unsupported chain ID "${id}"`);
    }
}
exports.Networks = Networks;
Networks.CHAINS = Chains_json_1.default.map(chainToEthNetwork);
Networks.CHAINS_BY_ID = byId(c => c.id, Networks.CHAINS);
Networks.CHAINS_BY_CHAIN_ID = byId(c => c.chainId, Networks.CHAINS);
//# sourceMappingURL=Networks.js.map
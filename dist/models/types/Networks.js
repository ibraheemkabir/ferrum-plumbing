"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Chains downloaded from https://chainid.network/chains.json
const ValidationUtils_1 = require("../../utils/ValidationUtils");
const Chains_json_1 = __importDefault(require("./Chains.json"));
function updateLogoForNetwork(network, logoUri, logoBase64) {
    const net = Networks.for(network);
    net.chainLogoUri = logoUri || net.chainLogoUri;
    net.chainLogoBase64 = logoBase64 || net.chainLogoBase64;
}
exports.updateLogoForNetwork = updateLogoForNetwork;
function chainToEthNetwork(chain) {
    if (chain.chain === 'ETH') {
        chain.chain = 'ETHEREUM';
    }
    let id = `${chain.chain.toUpperCase()}_${chain.network.toUpperCase()}`;
    // Backward compatiblity
    let cur = chain.nativeCurrency.symbol;
    let testnet = chain.network !== 'mainnet';
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
    if (id === 'MATIC_MAINNET') {
        id = 'POLYGON';
    }
    if (id === 'ETHEREUM_RINKEBY') {
        id = 'RINKEBY';
        cur = 'ETH';
        chain.chainId = 4;
    }
    if (id === 'MOON_MOONRIVER') {
        testnet = false;
    }
    // Harmony special case
    if (chain.chainId === 1666700000) {
        id = 'HARMONY_TESTNET_0';
    }
    if (chain.chainId === 1666700001) {
        id = 'HARMONY_TESTNET_1';
    }
    if (chain.chainId === 1666700002) {
        id = 'HARMONY_TESTNET_2';
    }
    if (chain.chainId === 1666700003) {
        id = 'HARMONY_TESTNET_3';
    }
    if (chain.chainId === 1666600000) {
        id = 'HARMONY_MAINNET_0';
    }
    if (chain.chainId === 1666600001) {
        id = 'HARMONY_MAINNET_1';
    }
    if (chain.chainId === 1666600002) {
        id = 'HARMONY_MAINNET_2';
    }
    if (chain.chainId === 1666600003) {
        id = 'HARMONY_MAINNET_3';
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
        testnet,
        defaultRpcEndpoint: (chain.rpc || []).find((r) => (r || '').indexOf('{') <= 0) || '',
    };
}
function byId(key, items) {
    const rv = new Map();
    items.forEach(i => {
        var _a;
        const k = (_a = key(i)) === null || _a === void 0 ? void 0 : _a.toString();
        if (k && !rv.get(k)) {
            rv.set(k, i);
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
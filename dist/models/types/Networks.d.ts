export interface EthNetwork {
    id: string;
    displayName: string;
    baseSymbol: string;
    baseCurrency: string;
    chainId: number;
    explorer: string;
}
export declare class Networks {
    static CHAINS: EthNetwork[];
    static CHAINS_BY_ID: Map<string, EthNetwork>;
    static CHAINS_BY_CHAIN_ID: Map<string, EthNetwork>;
    static for(id: string): EthNetwork;
    static forChainId(id: number): EthNetwork;
}
//# sourceMappingURL=Networks.d.ts.map
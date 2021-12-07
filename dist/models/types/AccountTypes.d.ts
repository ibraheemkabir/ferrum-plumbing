export declare const API_VERSION = "0.0.1";
export declare type Network = 'ETHEREUM' | 'BITCOIN' | 'BITCOIN_TESTNET' | 'BINANCE' | 'BINANCE_TESTNET' | 'FERRUM' | 'RINKEBY' | 'BSC' | 'BSC_TESTNET' | 'POLYGON' | 'MUMBAI_TESTNET' | 'SOLANA' | 'SOLANA_TESTNET' | 'AVAX' | 'AVAX_TESTNET';
export declare type AccountTransactionHandlerService = 'kudi' | 'unifyre';
export interface NetworkedConfig<T> {
    [network: string]: T;
}
//# sourceMappingURL=AccountTypes.d.ts.map
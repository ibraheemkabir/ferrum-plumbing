
export const API_VERSION = '0.0.1';

export type Network = 'ETHEREUM' |
    'BITCOIN' | 'BITCOIN_TESTNET' | 'BINANCE' | 'BINANCE_TESTNET' | 'FERRUM' |
    'RINKEBY' | 'BSC' | 'BSC_TESTNET' | 'POLYGON' | 'MUMBAI_TESTNET' | 'SOLANA'
    | 'SOLANA_TESTNET' | 'AVAX_TESTNET'|'AVAX_MAINNET'|
    'MOON_MOONRIVER' | 'MOON_MOONBASE' |
    'HARMONY_TESTNET_0' | 'HARMONY_TESTNET_1' | 'HARMONY_TESTNET_2' | 'HARMONY_TESTNET_3' |
    'HARMONY_MAINNET_0' | 'HARMONY_MAINNET_1' | 'HARMONY_MAINNET_2' | 'HARMONY_MAINNET_3'|'FTM_MAINNET'|'FTM_TESTNET';

export type AccountTransactionHandlerService = 'kudi' | 'unifyre';

export interface NetworkedConfig<T> {
  [network: string]: T;
}

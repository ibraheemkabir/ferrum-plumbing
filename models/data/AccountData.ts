import { Network } from '../types/AccountTypes';
import { HexString } from './Types';
import {EncryptedData} from "./CryptoData";

/**
 * @deprecated Never store private keys unencrypted.
 */
export interface AddressWithSecretKeys {
  network: Network;
  address: string;
  privateKeyHex: HexString;
  createdAt: number;
}

export interface AddressWithEncryptedKeys {
  network: Network;
  address: string;
  key: EncryptedData;
  createdAt: number;
}

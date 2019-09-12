import { Network } from '../types/AccountTypes';
import { HexString } from './Types';

export interface AddressWithSecretKeys {
  network: Network;
  address: string;
  privateKeyHex: HexString;
}

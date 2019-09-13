/**
 * Represents encrypted data.
 * Both key and data are in hex format
 */
import { HexString } from './Types';

export interface EncryptedData {
  key: HexString;
  data: HexString;
}

export interface InternalCloudEncryptedKey {
  algo: string;
  keyId: string;
  version: string;
  key: HexString;
}

export interface InternalReactNativeEncryptedKey {
  algo: string;
  keyId: string;
  key: HexString;
}

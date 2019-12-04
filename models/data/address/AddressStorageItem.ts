import {AddressWithEncryptedKeys} from "../AccountData";

export interface AddressStorageItem extends AddressWithEncryptedKeys {
    checksumAddress?: string;
    sweepable: boolean;
}

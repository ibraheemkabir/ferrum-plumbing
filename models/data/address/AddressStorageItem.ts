import {AddressWithEncryptedKeys} from "../AccountData";

export interface AddressStorageItem extends AddressWithEncryptedKeys {
    sweepable: boolean;
}

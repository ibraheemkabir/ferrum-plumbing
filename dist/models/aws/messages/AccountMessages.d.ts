import { AccountTransactionHandlerService, Network } from "../../types/AccountTypes";
export interface AwsMessage {
    eventType: string;
    id: string;
    version: string;
}
export interface ListenToAddress extends AwsMessage {
    eventType: 'ferrum.models.AccountMessages.ListenToAddress';
    network: Network;
    address: string;
    handler: AccountTransactionHandlerService[];
}
//# sourceMappingURL=AccountMessages.d.ts.map
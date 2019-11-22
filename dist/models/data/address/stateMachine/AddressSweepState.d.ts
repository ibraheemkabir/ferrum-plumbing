import { Network } from '../../../types/AccountTypes';
export interface PaymentRequest {
    network: Network;
    address: string;
    currency: string;
    sweep: {
        state: 'none' | 'failed' | 'sweepSubmitted' | 'sweeped';
        calculatedGas: string;
        transactionId: string;
        sweepTransactionId?: string;
        gasSubmittedTime?: number;
        sweepSubmittedTime?: number;
        reason?: string;
    };
}
//# sourceMappingURL=AddressSweepState.d.ts.map
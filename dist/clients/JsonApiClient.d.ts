import { JsonRpcClient, JsonRpcRequest } from "../models/aws/client/JsonRpcClient";
import { AuthenticationProvider } from "./AuthenticationProvider";
/**
 * A client that produces slightly different call format compared to JSON RPC:
 * - data will be passed as POST body
 */
export declare class JsonApiClient extends JsonRpcClient {
    constructor(endpoint: string, authProvider: AuthenticationProvider);
    protected fetch(request: JsonRpcRequest, headers: Headers): Promise<Response>;
}
//# sourceMappingURL=JsonApiClient.d.ts.map
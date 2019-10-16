import {JsonRpcClient, JsonRpcRequest} from "../models/aws/client/JsonRpcClient";
import {Headers} from "cross-fetch";
import {AuthenticationProvider} from "./AuthenticationProvider";
import {ValidationUtils} from "../utils/ValidationUtils";

/**
 * A client that produces slightly different call format compared to JSON RPC:
 * - data will be passed as POST body
 */
export class JsonApiClient extends JsonRpcClient {
    constructor(endpoint: string, authProvider: AuthenticationProvider) {
        super(endpoint, '', '', authProvider)
    }
    protected async fetch(request: JsonRpcRequest, headers: Headers) {
        ValidationUtils.isTrue(!request.params && !request.params!.length,
            'Do not include "params" when using JsonApiClient');
        return fetch({
            headers,
            method: 'POST',
            url: this.endpoint + '/' + request.command,
            body: JSON.stringify(request.data),
        } as any);
    }
}

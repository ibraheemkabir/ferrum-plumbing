import { AuthenticationProvider } from "../../../clients/AuthenticationProvider";
export declare class JsonRpcError extends Error {
}
export interface JsonRpcRequest {
    command: string;
    params: string[];
    data: {
        [key: string]: any;
    };
}
export interface JsonRpcResponse {
    responseTime: number;
    data: {
        [key: string]: any;
    };
    error?: string;
}
export declare function raiseForReponse(response: JsonRpcResponse): void;
export declare class JsonRpcClient {
    endpoint: string;
    private apiKey;
    private secretKey;
    private authProvider?;
    constructor(endpoint: string, apiKey: string, secretKey: string, authProvider?: AuthenticationProvider | undefined);
    call(request: JsonRpcRequest, headers?: Headers): Promise<JsonRpcResponse>;
    protected fetch(request: JsonRpcRequest, headers: Headers): Promise<Response>;
}
//# sourceMappingURL=JsonRpcClient.d.ts.map
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
export declare class JsonRpcClient {
    endpoint: string;
    private apiKey;
    private secretKey;
    constructor(endpoint: string, apiKey: string, secretKey: string);
    call(request: JsonRpcRequest, headers?: Headers): Promise<JsonRpcResponse>;
}
//# sourceMappingURL=JsonRpcClient.d.ts.map
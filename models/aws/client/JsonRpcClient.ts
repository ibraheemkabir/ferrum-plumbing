import fetch, {Headers} from "node-fetch";

export interface JsonRpcRequest {
    command: string;
    params: string[];
    data: {[key: string]: any}
}

export interface JsonRpcResponse {
    responseTime: number;
    data: {[key: string]: any}
    error?: string;
}


export class JsonRpcClient {
    constructor(public endpoint: string, private apiKey: string, private secretKey: string) {
    }

    async call(request: JsonRpcRequest, headers: Headers = new Headers()): Promise<JsonRpcResponse> {
        headers.append('Content-Type', 'application/json');
        const res = await fetch({
            headers,
            method: 'POST',
            url: this.endpoint,
            body: JSON.stringify(request),
        } as any);
        if (res.status / 100 === 2) {
            const jsonData = await res.json();
            return {
                responseTime: Date.now(),
                data: jsonData,
            }
        } else {
            const text = await res.text();
            return {
                responseTime: Date.now(),
                data: {},
                error: `${res.statusText}:${text}`,
            }
        }
    }
}
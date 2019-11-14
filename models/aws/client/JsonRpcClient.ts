import fetch, { Headers } from 'cross-fetch';
import {AuthenticationProvider} from "../../../clients/AuthenticationProvider";

export class JsonRpcError extends Error {}

export interface JsonRpcRequest {
  command: string;
  params: string[];
  data: {[key: string]: any};
}

export interface JsonRpcResponse {
  responseTime: number;
  data: {[key: string]: any};
  error?: string;
}

export function raiseForReponse(response: JsonRpcResponse) {
  if (!!response.error) {
    throw new JsonRpcError(response.error);
  }
}

export class JsonRpcClient {
  constructor(public endpoint: string, private apiKey: string, private secretKey: string,
              private authProvider?: AuthenticationProvider) {
  }

  async call(request: JsonRpcRequest, headers: Headers = new Headers()): Promise<JsonRpcResponse> {
    headers.append('Content-Type', 'application/json');
    if (this.authProvider) {
      const {key, value} = this.authProvider.asHeader();
      headers.append(key, value);
    }
    const res = await this.fetch(request, headers);
    // tslint:disable-next-line:no-magic-numbers
    if (Math.round(res.status / 100) === 2) {
      const jsonData = await res.json();
      return {
        responseTime: Date.now(),
        data: jsonData,
      };
    }
    const text = await res.text();
    return {
      responseTime: Date.now(),
      data: {},
      error: `${res.statusText}:${text}`,
    };
  }

  protected async fetch(request: JsonRpcRequest, headers: Headers) {
    const url = this.endpoint;
    return fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(request),
    } as any);
  }
}

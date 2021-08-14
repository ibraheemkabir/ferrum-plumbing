import fetch from 'cross-fetch';
import { Injectable, Logger, LoggerFactory } from 'models';

export class FetcherError extends Error {
	constructor(msg: string, public error: any) {
		super(msg);
	}
}

export class Fetcher implements Injectable {
	private log: Logger | undefined;
	constructor(
		private logFac: LoggerFactory | undefined,
	) {
		if (!!logFac) {
			this.log = logFac.getLogger(Fetcher);
		}
	}

	__name__() { return 'Fetcher'; }
	async fetch<T>(url: string, init: RequestInit | undefined): Promise<T> {
        try {
            const res = await fetch(url, init);
            const resText = await res.text();
            if (Math.round(res.status / 100) === 2) {
                return resText ? JSON.parse(resText) : undefined;
            }
            const error = resText;
            let jerror: any;
            try {
                jerror = JSON.parse(error);
            } catch (e) { }
			this._logError('Server returned an error when calling ' + url + JSON.stringify({
                status: res.status, statusText: res.statusText, error}), new Error());
            throw new FetcherError(jerror?.error ? jerror.error : error, jerror);
        } catch (e) {
			this._logError('Error calling api with ' + url + JSON.stringify(init), e as Error);
            throw e;
        }
	}

	_logError(msg: string, e: Error) {
		if (!!this.log) {
			this.log.error(msg, e);
		} else {
			console.error(msg, e);
		}
	}
}
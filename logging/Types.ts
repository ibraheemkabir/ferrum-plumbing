
export type LogWriter = (...args: any[]) => void;

export type LoggerForClassName = (className: string) => Logger;

export interface Logger {
    info(...args: any[]): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    critical(errorType: string, message: string, error: Error): void;
}


export interface AuthenticationProvider {
    getAuthSession(): string;
    asHeader(): {key: string, value: string};
}

export interface AuthenticationVerifyer {
    isValid(headers: any): boolean;
    isValidAsync(headers: any): Promise<boolean>;
    verify(headers: any): void;
    verifyAsync(headers: any): Promise<void>;
}

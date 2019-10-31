export interface AuthenticationProvider {
    getAuthSession(): string;
    asHeader(): {
        key: string;
        value: string;
    };
}
export interface AuthenticationVerifyer {
    isValid(headers: any): boolean;
    verify(headers: any): void;
}
//# sourceMappingURL=AuthenticationProvider.d.ts.map
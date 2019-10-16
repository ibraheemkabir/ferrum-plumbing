
export interface AuthenticationProvider {
    getAuthSession(): string;
    asHeader(): {key: string, value: string};
}

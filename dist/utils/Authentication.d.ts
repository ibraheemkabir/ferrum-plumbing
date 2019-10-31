import { AuthenticationProvider, AuthenticationVerifyer } from "../clients/AuthenticationProvider";
export declare class SecretAuthProvider implements AuthenticationProvider, AuthenticationVerifyer {
    private secret;
    constructor(secret: string);
    asHeader(): {
        key: string;
        value: string;
    };
    getAuthSession(): string;
    isValid(headers: any): boolean;
    verify(headers: any): void;
}
//# sourceMappingURL=Authentication.d.ts.map
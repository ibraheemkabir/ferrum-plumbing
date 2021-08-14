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
    isValidAsync(headers: any): Promise<boolean>;
    verify(headers: any): void;
    verifyAsync(headers: any): Promise<void>;
}
//# sourceMappingURL=Authentication.d.ts.map
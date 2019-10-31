import {AuthenticationProvider, AuthenticationVerifyer} from "../clients/AuthenticationProvider";
import {ValidationUtils} from "./ValidationUtils";

export class SecretAuthProvider implements AuthenticationProvider, AuthenticationVerifyer {
    constructor(private secret: string) {}

    asHeader(): { key: string; value: string } {
        return {key: 'X-Secret', value: this.secret};
    }

    getAuthSession(): string {
        return '';
    }

    isValid(headers: any): boolean {
        return headers['X-Secret'] === this.secret;
    }

    verify(headers: any): void {
        ValidationUtils.isTrue(this.isValid(headers), 'Unauthorized');
    }
}

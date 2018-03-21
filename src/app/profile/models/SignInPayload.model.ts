import { LoginMode } from './Login.model';
import { AuthPayload } from './AuthPayload.model';

export interface SignInPayload {
    type: LoginMode;
    isLogin: boolean;
    payload: AuthPayload;
}

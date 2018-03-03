import { LoginMode } from './';

export interface SignInPayload {
    type: LoginMode;
    isLogin: boolean;
}
import { OAuthProviders } from './Login.model';

export interface AuthPayload {
    email: string;
    password: string;
    alias: string;
    provider?: OAuthProviders;
}

export interface AuthResponse {
    token?: string;
    error?: {
        message: string;
    };
    message?: string;
}

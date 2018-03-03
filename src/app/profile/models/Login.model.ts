export enum LOGIN_MODES {
    'FACEBOOK' = 'FACEBOOK',
    'GOOGLE' = 'GOOGLE',
    'EMAIL' = 'EMAIL',
}

export type LoginMode =
    typeof LOGIN_MODES.FACEBOOK |
    typeof LOGIN_MODES.GOOGLE |
    typeof LOGIN_MODES.EMAIL;
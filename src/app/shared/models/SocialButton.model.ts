export enum BUTTON_TYPES {
    'FACEBOOK' = 'FACEBOOK',
    'GOOGLE' = 'GOOGLE',
}

export type ButtonType =
    typeof BUTTON_TYPES.FACEBOOK |
    typeof BUTTON_TYPES.GOOGLE;
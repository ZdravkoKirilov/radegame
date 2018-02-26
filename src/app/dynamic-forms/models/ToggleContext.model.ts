export interface ToggleContext {
    show?: {
        field: string;
        value: any[];
    };
    hide?: {
        field: string;
        value: any[];
    };
    defaultValue?: any;
}

export type ToggleFunction = (ctx: ToggleContext) => boolean;
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
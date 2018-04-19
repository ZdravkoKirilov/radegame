export type ToggleContext = {
    show?: {
        field: string;
        equals: any[];
    };
    hide?: {
        field: string;
        equals: any[];
    };
    disable?: {
        field: string;
        equals: any[];
    };
    defaultValue?: any;
};
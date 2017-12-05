export interface Option {
    label: string;
    value: string | number;
    image?: string;
}

export interface BaseControl {
    value?: any;
    name?: string;
    label?: string;
    removable?: boolean;
    errorMessage?: string;
    required?: boolean;
    controlType?: string;
    options?: Option[];
    childControls?: BaseControl[];
    childTemplate?: BaseControl;
    addButtonText?: string;
    multiple?: boolean;
    min?: number;
    max?: number;
    step?: number;
    buttonColor?: string;
}

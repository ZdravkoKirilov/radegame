import { FormDefinition } from './FormDefinition.model';

export interface Option {
    label: string;
    value: string | number;
    image?: string;
}

export interface SubFormMapping {
    [key: string]: FormDefinition;
}

export interface BaseControl {
    value?: any;
    name?: string;
    label?: string;
    errorMessage?: string;
    required?: boolean;
    controlType?: string;
    options?: Option[];
    childControls?: BaseControl[];
    childTemplate?: BaseControl;
    subFormMapping?: SubFormMapping;
    addButtonText?: string;
    multiple?: boolean;
    min?: number;
    max?: number;
    step?: number;
    buttonColor?: string;
}

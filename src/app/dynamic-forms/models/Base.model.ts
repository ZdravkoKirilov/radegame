import { FormDefinition } from './FormDefinition.model';
import { ConnectedEntities } from './ConnectedEntities';

export interface Option {
    label: string;
    value: string | number;
    image?: string;
}

export interface SubFormMapping {
    [key: string]: {
        form: FormDefinition,
        name: string;
    };
}

export interface BaseControl {
    value?: any;
    name?: string;
    label?: string;
    errorMessage?: string;
    required?: boolean;
    hidden?: boolean;
    controlType?: string;
    options?: Option[];
    childControls?: BaseControl[];
    childTemplate?: BaseControl;
    subFormMapping?: SubFormMapping;
    connectedEntities?: ConnectedEntities;
    addButtonText?: string;
    multiple?: boolean;
    min?: number;
    max?: number;
    step?: number;
    buttonColor?: string;
}

import { FormDefinition } from './FormDefinition.model';
import { ConnectedEntities } from './ConnectedEntities';
import { ToggleContext } from './ToggleContext.model';
import { CrossFieldContext } from './CrossFieldContext.model';

export interface Option {
    value: string | number;
    label?: string;
    image?: string;
    context?: ToggleContext;
}

export interface SubFormMapping {
    [key: string]: {
        form: FormDefinition,
        name: string;
    };
}

export interface BaseControl {
    value?: any;
    defaultValue?: any;
    name?: string;
    label?: string;
    errorMessage?: string;
    required?: boolean;
    hidden?: boolean;
    readonly?: boolean;
    controlType?: string;
    options?: Option[];
    childControls?: BaseControl[];
    childTemplate?: BaseControl;
    connectedEntities?: ConnectedEntities;
    addButtonText?: string;
    multiple?: boolean;
    min?: number;
    max?: number;
    step?: number;
    buttonColor?: string;
    hideThumbnail?: boolean;
    toggleContext?: ToggleContext;
    crossFieldContext?: CrossFieldContext;
    minItems?: number;
    maxItems?: number;
    isEmail?: boolean;
    showImage?: boolean;
    asBase64?: boolean;
}

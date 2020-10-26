import { FormDefinition } from './FormDefinition.model';
import { ConnectedEntities } from './ConnectedEntities';
import { ToggleContext } from './ToggleContext.model';
import { CrossFieldContext } from './CrossFieldContext.model';

export type Option = {
    value: any;
    label?: string;
    image?: string;
    context?: ToggleContext;
}

export type BaseControl = Partial<{
    value: any;
    defaultValue: any;
    name: string;
    label: string;
    errorMessage: string;
    required: boolean;
    hidden: boolean;
    readonly: boolean;
    type: string;
    options: Option[];
    children: BaseControl[];
    childTemplate: BaseControl;
    connectedEntities: ConnectedEntities;
    childrenDefinition: FormDefinition<object>;
    addButtonText: string;
    multiple: boolean;
    min: number;
    max: number;
    step: number;
    buttonColor: string;
    hideThumbnail: boolean;
    toggleContext: ToggleContext;
    crossFieldContext: CrossFieldContext;
    minItems: number;
    maxItems: number;
    isEmail: boolean;
    showImage: boolean;
    asBase64: boolean;
    asString: boolean;
    valueField: string;
}>

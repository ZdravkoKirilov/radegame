export interface Option {
    label: string;
    value: string|number;
    image?: string;
}

export abstract class BaseControl<T> {
    value?: T;
    name?: string;
    label?: string;
    hint?: string;
    errorMessage?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    options?: Option[];
    childControls?: BaseControl<T>[];
    multiple?: boolean;
    min?: number;
    max?: number;
    step?: number;
    buttonColor?: string;

    constructor(options: BaseControl<any> = {}) {
        this.value = options.value;
        this.name = options.name || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.hint = options.hint || '';
        this.errorMessage = options.errorMessage || '';
        this.options = options.options || [];
        this.multiple = !!options.multiple;
        this.min = options.min || null;
        this.max = options.max || null;
        this.step = options.step || null;
    }
}

export interface FormContext {
    [key: string]: {
        toggleFunc: ToggleFunction;
        defaultValue: any;
    }
}

export type ToggleFunction = (ctx: FormContext) => boolean;
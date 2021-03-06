import { BaseControl } from './models';

export const showControl = (data: BaseControl, formData: { [key: string]: any }): boolean => {
    if (data.toggleContext && data.toggleContext.show) {
        const ctx = data.toggleContext.show;
        const value = formData[ctx.field];
        const visible = ctx.equals.indexOf(value) !== -1;
        return visible;
    }
    return true;
};


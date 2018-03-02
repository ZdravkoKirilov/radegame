import { FormGroup } from '@angular/forms';
import { BaseControl } from './models';

export const showControl = (data: BaseControl, form: FormGroup, index?: any): boolean => {
    if (data.toggleContext && data.toggleContext.show) {
        const ctx = data.toggleContext.show;
        const value = (parseInt(index, 10) > -1) ? form.value[index][ctx.field] : form.value[ctx.field];
        const visible = ctx.value.indexOf(value) !== -1;
        return visible;
    }
    return true;
}

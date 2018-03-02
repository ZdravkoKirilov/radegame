import { ValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { BaseControl } from '../models';

export const cross = (data: BaseControl, form: FormGroup): ValidatorFn => (control: FormControl): { [key: string]: any } => {
    const { field, shouldHaveValue } = data.crossFieldContext;
    const value = form.value[field];

    if (value !== shouldHaveValue) {
        return {
            crossField: { value }
        }
    }

    return null;
};
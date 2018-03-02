import { ValidatorFn, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { BaseControl } from '../models';
import { showControl } from '../helpers';

export const requiredIfVisible = (
    data: BaseControl,
    form: FormGroup,
    index?: number): ValidatorFn => (control: FormControl): ValidationErrors => {
        const isVisible = showControl(data, form, index);
        let result = null;

        if (isVisible && valueIsEmpty(control.value)) {
            result = { requiredIfVisible: { value: 'test' } };
        }
        return result;
    };

const valueIsEmpty = (value: any) => {
    return value === null || value === undefined || value === '';
};



import { ValidatorFn, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { BaseControl } from '../models';
import { showControl } from '../helpers';

export const requiredIfVisible = (
  data: BaseControl,
  form: FormGroup): ValidatorFn | any => (control: FormControl): ValidationErrors => {
    const isVisible = showControl(data, form.value);
    let result = null;

    if (isVisible && valueIsEmpty(control.value)) {
      result = { requiredIfVisible: { value: 'test' } };
    }
    return result as any;
  };

const valueIsEmpty = (value: any) => {
  return value === null || value === undefined || value === '';
};



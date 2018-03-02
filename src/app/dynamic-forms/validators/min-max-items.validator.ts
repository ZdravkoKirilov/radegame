import { ValidatorFn, FormArray } from '@angular/forms';
import { BaseControl } from '../models';

export const minItems = (data: BaseControl): ValidatorFn => (control: FormArray): { [key: string]: any } => {
    let aboveMin = null;

    if (data.minItems && data.minItems > control.value.length) {
        aboveMin = {
            minItems: { value: control.value.length }
        };
    }

    return aboveMin;
};

export const maxItems = (data: BaseControl): ValidatorFn => (control: FormArray): { [key: string]: any } => {
    let aboveMin = null;

    if (data.minItems && data.maxItems > control.value.length) {
        aboveMin = {
            maxItems: { value: control.value.length }
        };
    }

    return aboveMin;
};

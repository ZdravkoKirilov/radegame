import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators as vd } from '@angular/forms';

import { BaseControl } from '../models/Base';
import { controlTypes } from '../config/controlTypes';

@Injectable()
export class ControlsService {

    constructor() {
    }

    toFormGroup(controls: BaseControl[]) {
        const group = {};
        controls.forEach((elem: BaseControl) => {
            const validators = elem.required ? [vd.required] : [];
            if (elem.controlType === controlTypes.FORM_ARRAY) {
                group[elem.name] = this.toFormArray(elem.childControls);
            } else {
                group[elem.name] = new FormControl(elem.value, vd.compose(validators));
            }
        });
        return new FormGroup(group);
    }

    toFormArray(controls: BaseControl[]) {
        const formArray = new FormArray([]);
        controls.forEach((elem: BaseControl) => {
            const control = this.toFormGroup(elem.childControls);
            formArray.push(control);
        });
        return formArray;
    }

    patchFormDeep(form: FormGroup, data: {}, valueProps: string[]) {
        form.patchValue(data);
        for (const key in data) {
            const control = form.get(key);
            if (control instanceof FormGroup) {
                const valueAt = valueProps.shift();
                const nestedData = {...data[key]};
                for (let k in nestedData) {
                    nestedData[k] = nestedData[k][valueAt];
                }
                this.patchFormDeep(control, nestedData, valueProps);
            }
        }
    }
}

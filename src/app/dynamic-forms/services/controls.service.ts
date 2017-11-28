import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators as vd } from '@angular/forms';

import { BaseControl } from '../models/Base';
import { controlTypes } from '../config/controlTypes';

@Injectable()
export class ControlsService {

    constructor() {
    }

    toFormGroup(controls: BaseControl<any>[]) {
        const group = {};
        controls.forEach((elem: BaseControl<any>) => {
            const validators = elem.required ? [vd.required] : [];
            if (elem.controlType === controlTypes.NESTED_FORM) {
                group[elem.name] = this.toFormGroup(elem.childControls);
            } else {
                group[elem.name] = new FormControl(elem.value, vd.compose(validators));
            }
        });
        return new FormGroup(group);
    }

    patchFormDeep(form: FormGroup, data: {}, valueProps: string[]) {
        form.patchValue(data);
        for (let key in data) {
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

    toFormArray(controls: BaseControl<any>[]) {
        const formArray = new FormArray([]);
        controls.forEach((elem: BaseControl<any>) => {
            const validators = elem.required ? [vd.required] : [];
            const control = new FormControl(elem.value, vd.compose(validators));
            formArray.push(control);
        });
        return formArray;
    }
}

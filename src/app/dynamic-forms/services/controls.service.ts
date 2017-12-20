import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators as vd } from '@angular/forms';

import { BaseControl } from '../models/Base.model';
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
}

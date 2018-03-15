import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators as vd, ValidatorFn } from '@angular/forms';

import { BaseControl } from '../models';
import { controlTypes } from '../config/controlTypes';
import { minItems, maxItems, cross, requiredIfVisible } from '../validators';

@Injectable()
export class ControlsService {

    constructor() {
    }

    toFormGroup(controls: BaseControl[]) {
        const group = new FormGroup({});
        controls.forEach((elem: BaseControl) => {
            const validators = this.addValidators(elem, group);
            if (elem.controlType === controlTypes.FORM_ARRAY) {
                const arr = this.toFormArray(elem);
                group.addControl(elem.name, arr);
            } else {
                const ctrl = new FormControl(elem.value, vd.compose(validators));
                group.addControl(elem.name, ctrl);
            }
        });
        return group;
    }

    toFormArray(control: BaseControl) {
        const controls = control.childControls;
        const formArray = new FormArray([], vd.compose([
            minItems(control),
            maxItems(control),
        ]));
        controls.forEach((elem: BaseControl) => {
            const subform = this.toFormGroup(elem.childControls);
            formArray.push(subform);
        });
        return formArray;
    }

    addValidators(elem: BaseControl, group: FormGroup): ValidatorFn[] {
        let validators = [];
        if (elem.required) {
            if (elem.toggleContext) {
                validators.push(requiredIfVisible(elem, group));
            } else {
                validators.push(vd.required);
            }
        }
        validators = elem.crossFieldContext ? [...validators, cross(elem, group)] : validators;
        return validators;
    }
}

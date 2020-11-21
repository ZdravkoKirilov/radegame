import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators as vd, ValidatorFn } from '@angular/forms';

import { BaseControl } from '../models';
import { controlTypes } from '../config/controlTypes';
import { minItems, maxItems, requiredIfVisible } from '../validators';

@Injectable()
export class ControlsService {

  constructor() {
  }

  toFormGroup(controls: BaseControl[]) {
    const group = new FormGroup({});
    controls.forEach((elem: BaseControl) => {
      const validators = this.addValidators(elem, group);
      if (elem.type === controlTypes.GROUP) {
        const arr = this.toFormArray(elem);
        group.addControl(elem.name, arr);
      } else {
        const value = elem.value !== undefined ? elem.value : elem.defaultValue;
        const ctrl = new FormControl(value, vd.compose(validators));
        group.addControl(elem.name, ctrl);
      }
    });
    return group;
  }

  toFormArray(control: BaseControl) {
    const controls = control.children;
    const formArray = new FormArray([], vd.compose([
      minItems(control),
      maxItems(control),
    ] as any));
    controls.forEach((elem: BaseControl) => {
      const subform = this.toFormGroup(elem.children);
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
    return validators;
  }
}

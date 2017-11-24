import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators as vd } from '@angular/forms';

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
            }
            group[elem.name] = new FormControl(elem.value, vd.compose(validators));
        });
        return new FormGroup(group);
    }
}

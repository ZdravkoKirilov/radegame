import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators as vd} from '@angular/forms';

import {BaseControl} from '../models/Base';

@Injectable()
export class ControlsService {

    constructor() {
    }

    toFormGroup(controls: BaseControl<any>[]) {
        const group = {};
        controls.forEach(function (elem) {
            const validators = elem.required ? [vd.required] : [];
            group[elem.name] = new FormControl(elem.value, vd.compose(validators));
        });
        return new FormGroup(group);
    }
}

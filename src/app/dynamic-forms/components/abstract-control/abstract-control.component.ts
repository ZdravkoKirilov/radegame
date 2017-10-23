import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';
import { controlTypes } from '../../config/controlTypes';

@Component({
    selector: 'rg-abstract-control',
    templateUrl: './abstract-control.component.html',
    styleUrls: ['./abstract-control.component.scss']
})
export class AbstractControlComponent {
    @Input() form: FormGroup;
    @Input() data: BaseControl<any>;
    types = controlTypes;

    constructor() {
    }
    handleFieldChange(data: BaseControl<any>): void {
        this.form.patchValue(data);
    }
}

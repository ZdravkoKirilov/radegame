import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base';

@Component({
    selector: 'rg-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {

    @Input() form: FormGroup;
    @Input() data: BaseControl<string>;

    constructor() {
    }

    get isValid() {
        if ('controls' in this.form) {
            return this.form.controls[this.data.name].valid;
        }
    }

    handleChange(event) {
        event.stopPropagation();
    }

}

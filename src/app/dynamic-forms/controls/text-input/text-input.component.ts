import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
    @Input() form: FormGroup;
    @Input() data: BaseControl<string>;

    constructor() {
    }

    get isValid() {
        return this.form.controls[this.data.name].valid;
    }

    handleChange(event) {
        event.stopPropagation();
        this.form.patchValue({
            [this.data.name]: event.currentTarget.value
        });
    }
}

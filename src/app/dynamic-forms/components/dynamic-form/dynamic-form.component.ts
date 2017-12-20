import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';

@Component({
    selector: 'rg-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Input() controls: BaseControl[] = [];
    @Input() form: FormGroup;

    constructor() {
    }

    handleFieldChange(data: any) {
        this.form.patchValue(data);
    }

    ngOnInit() {
        this.form.valueChanges.subscribe(formData => {
            console.log(formData);
            console.log(this.form.valid);
        });
    }
}

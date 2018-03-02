import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';
import { showControl } from '../../helpers';

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

    ngOnInit() {
        this.form.valueChanges.subscribe(formData => {
            console.log(formData, this.form.valid);
        });
    }

    handleFieldChange(data: any) {
        this.form.patchValue(data);
    }

    showControl(data: BaseControl): boolean {
        return showControl(data, this.form);
    }
}

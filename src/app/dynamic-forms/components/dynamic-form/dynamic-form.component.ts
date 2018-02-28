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

    ngOnInit() {
        this.form.valueChanges.subscribe(formData => {
            console.log(formData);
            console.log(this.form.valid);
        });
    }

    handleFieldChange(data: any) {
        this.form.patchValue(data);
    }

    showControl(data: BaseControl) {
        if (data.toggleContext && data.toggleContext.show) {
            const ctx = data.toggleContext.show;
            const value = this.form.value[ctx.field];
            const visible = ctx.value.indexOf(value) !== -1;
            if (!visible) {
                // this.form.patchValue({
                //     [data.name]: data.toggleContext.defaultValue
                // });
            }
            return visible;
        }
        return true;
    }
}

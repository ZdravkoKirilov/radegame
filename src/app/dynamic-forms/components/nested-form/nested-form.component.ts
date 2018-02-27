import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';

@Component({
    selector: 'rg-nested-form',
    templateUrl: './nested-form.component.html',
    styleUrls: ['./nested-form.component.scss']
})
export class NestedFormComponent {

    @Input() form: FormGroup;
    @Input() ownGroup: FormGroup;
    @Input() data: BaseControl;
    @Input() index: number;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    fieldChange(data) {
        this.change.emit({
            index: this.index,
            data,
        });
    }

    showControl(data: BaseControl) {
        if (data.toggleContext && data.toggleContext.show) {
            const ctx = data.toggleContext.show;
            let value;
            if (this.ownGroup) {
                value = this.ownGroup.value[this.index][ctx.field];
            } else {
                value = this.form.value[ctx.field];
            }

            const visible = ctx.value.indexOf(value) !== -1;
            if (!visible) {
                if (this.ownGroup) {
                    this.ownGroup.controls[this.index].patchValue({
                        [data.name]: data.toggleContext.defaultValue
                    })
                } else {
                    this.form.patchValue({
                        [data.name]: data.toggleContext.defaultValue
                    });
                }
            }
            return visible;
        }
        return true;
    }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';
import { showControl } from '../../helpers';

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

    showControl(data: BaseControl): boolean {
        const index = parseInt(this.index as any, 10);
        const form = this.ownGroup || this.form;
        return showControl(data, form.value[index]);
    }
}

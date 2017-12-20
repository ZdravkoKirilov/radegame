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
}

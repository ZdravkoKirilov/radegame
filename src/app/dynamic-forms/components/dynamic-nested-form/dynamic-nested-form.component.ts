import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';

@Component({
    selector: 'rg-dynamic-nested-form',
    templateUrl: './dynamic-nested-form.component.html',
    styleUrls: ['./dynamic-nested-form.component.scss']
})
export class DynamicNestedFormComponent {

    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Input() index: number;
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() reshape: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    fieldChange(data) {
        if (this.data.childTemplate.name in data) {
            this.reshape.emit({
                index: this.index,
                config: this.data, data
            });
        } else {
            this.change.emit({
                index: this.index,
                data
            });
        }
    }
}

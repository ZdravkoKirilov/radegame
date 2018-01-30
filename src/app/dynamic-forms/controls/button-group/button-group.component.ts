import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';

@Component({
    selector: 'rg-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent {
    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    handleChange({value}) {
        const currentValue = this.form.get(this.data.name).value;
        const currentSet = currentValue ? new Set([...currentValue]) : new Set();
        currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
        this.change.emit({
            [this.data.name]: Array.from(currentSet)
        });
    }
}

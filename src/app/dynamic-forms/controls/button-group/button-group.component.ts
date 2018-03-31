import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';

@Component({
    selector: 'rg-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<any> = new EventEmitter();

    private value;

    ngOnInit() {
        this.value = this.data.value ? new Set([...this.data.value]) : new Set();
    }

    isButtonChecked(value) {
        if (this.value) {
            return new Set(this.value).has(value);
        }
        return false;
    }

    handleChange(value) {
        //const currentValue = this.form.get(this.data.name).value;
        //const currentValue = this.data.value || [];
        //const currentSet = new Set([...currentValue]) : new Set();
        let currentSet = this.value;
        if (this.data.multiple) {
            currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
        } else {
            currentSet = new Set([value]);
        }
        this.value = currentSet;

        this.change.emit({
            [this.data.name]: Array.from(currentSet)
        });
    }
}

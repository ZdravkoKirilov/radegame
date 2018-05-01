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
        if (this.data.multiple) {
            this.value = this.data.value ? new Set([...this.data.value]) :
                this.data.defaultValue !== undefined ? new Set([this.data.defaultValue]) : new Set();
        } else {
            this.value = this.data.value !== undefined ? this.data.value : this.data.defaultValue;
        }
    }

    isButtonChecked(value) {
        if (this.value !== undefined) {
            return this.data.multiple ? new Set(this.value).has(value) : this.value === value;
        }
        return false;
    }

    handleChange(value) {
        //const currentValue = this.form.get(this.data.name).value;
        //const currentValue = this.data.value || [];
        //const currentSet = new Set([...currentValue]) : new Set();
        let currentValue = this.value;
        if (this.data.multiple) {
            currentValue.has(value) ? currentValue.delete(value) : currentValue.add(value);
        } else {
            currentValue = value;
        }
        this.value = currentValue;

        this.change.emit({
            [this.data.name]: this.data.multiple ? Array.from(currentValue) : currentValue
        });
    }
}

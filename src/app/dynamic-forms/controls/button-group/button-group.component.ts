import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';

@Component({
    selector: 'rg-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<any> = new EventEmitter();

    private value: any;

    ngOnInit() {
        if (this.data.multiple) {
            if (this.data.asString) {
                this.value = this.data.value ? this.data.value.split(',').filter(elem => !!elem) :
                    this.data.defaultValue !== undefined ? this.data.defaultValue : [];
            } else {
                this.value = this.data.value ? [...this.data.value] :
                    this.data.defaultValue !== undefined ? [this.data.defaultValue] : [];
            }
            
            this.change.emit({
                [this.data.name]: this.value
            });

        } else {
            this.value = this.data.value !== undefined ? this.data.value : this.data.defaultValue;
            this.handleChange(this.value);
        }
    }

    isButtonChecked(value) {
        if (this.value !== undefined) {

            if (this.data.multiple) {
                const field = this.data.valueField;
                const index = this.value.map(elem => field ? elem[field] : elem).indexOf(value);
                return index !== -1;
            } else {
                return this.value === value
            }
        }
        return false;
    }

    handleChange(value) {
        const field = this.data.valueField;
        let currentValue = this.value;
        if (this.data.multiple) {
            const asIntArr = currentValue.map(elem => field ? elem[field] : elem);
            const index = asIntArr.indexOf(value);
            currentValue = [...currentValue];
            if (index !== -1) {
                currentValue.splice(index, 1);
            } else {
                currentValue.push(field ? { [field]: value } : value);
            }
        } else {
            currentValue = value;
        }

        this.value = currentValue;

        this.change.emit({
            [this.data.name]: this.data.asString ? currentValue.join(',') : currentValue
        });
    }
}

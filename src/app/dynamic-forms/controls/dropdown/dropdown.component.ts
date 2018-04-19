import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import { BaseControl, Option, ToggleContext } from '../../models';

@Component({
    selector: 'rg-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() data: BaseControl;
    @Input() form: FormGroup;
    @Input() group: FormGroup;
    @Output() change: EventEmitter<any> = new EventEmitter();

    value?: string | number;

    constructor() {
    }

    ngOnInit() {
        this.value = this.data.value || '';
    }

    handleChange(event: MatSelectChange) {
        this.value = event.value;
        this.change.emit({
            [this.data.name]: event.value
        });
    }

    isDisabled(option: Option): boolean {
        if ('context' in option) {
            const { context } = option;
            const form = this.group || this.form;
            const value = form.controls[context.disable.field].value;
            if (context.disable.equals.indexOf(value) !== -1) {
                (this.value === option.value) ? this.resetValue(form, context) : null;
                return true;
            }
        }
        return false;
    }

    resetValue(form: FormGroup, context: ToggleContext) {
        const self = form.controls[this.data.name];
        self.setValue(context.defaultValue);
        this.value = context.defaultValue;
    }
}

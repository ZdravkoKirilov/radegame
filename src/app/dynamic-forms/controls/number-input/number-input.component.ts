import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';

@Component({
    selector: 'rg-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit{

    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<any> = new EventEmitter();
    value: number;

    constructor() {
    }

    get isValid() {
        const name = this.data.name;
        const controls = this.form.controls;
        if ('controls' in this.form && name in controls) {
            return controls[name].valid;
        }
    }

    handleChange(event) {
        event.stopPropagation();
        this.value = event.target.value;
        this.change.emit({
            [this.data.name]: event.target.value
        });
    }

    ngOnInit() {
        this.value = this.data.value || '';
    }
}

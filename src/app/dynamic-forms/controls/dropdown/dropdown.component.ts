import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseControl } from '../../models/Base.model';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

@Component({
    selector: 'rg-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() data: BaseControl;
    @Input() form: FormGroup;
    @Output() change: EventEmitter<any> = new EventEmitter();

    value?: string | number;

    constructor() {
    }

    handleChange(event: MatSelectChange) {
        this.value = event.value;
        this.change.emit({
            [this.data.name]: event.value
        });
    }

    ngOnInit() {
        this.value = this.data.value || '';
    }
}

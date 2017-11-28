import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base';

@Component({
    selector: 'rg-nested-form',
    templateUrl: './nested-form.component.html',
    styleUrls: ['./nested-form.component.scss']
})
export class NestedFormComponent implements OnInit {
    @Input() data: BaseControl<any>;
    @Input() form: FormGroup;
    public subForm: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.subForm = this.form.get(this.data.name) as FormGroup;
    }

}

import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Input() controls: BaseControl<any>[] = [];
    @Input() form: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }
}

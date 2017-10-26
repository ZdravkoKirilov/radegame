import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Input() controls: BaseControl<any>[] = [];
    @Input() form: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

}

import {Component, OnInit} from '@angular/core';

import {BaseControl} from '../../../dynamic-forms/models/Base';
import {FIELD_SETTINGS} from '../../configs/form-definitions';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss']
})
export class SmartFieldsComponent implements OnInit {
    controls: BaseControl<any>[];

    constructor() {
        this.controls = FIELD_SETTINGS([]);
    }

    ngOnInit() {
    }

}

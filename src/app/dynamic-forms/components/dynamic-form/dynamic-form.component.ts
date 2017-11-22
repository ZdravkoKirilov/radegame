import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base';
import { propHasChanged } from '../../../shared/utils/propsCheck';

@Component({
    selector: 'rg-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
    @Input() controls: BaseControl<any>[] = [];
    @Input() form: FormGroup;

    constructor() {
    }

    ngOnChanges(e: SimpleChanges) {

    }
}

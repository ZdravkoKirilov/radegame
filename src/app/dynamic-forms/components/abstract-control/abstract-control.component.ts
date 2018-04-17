import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';
import { controlTypes } from '../../config/controlTypes';

@Component({
    selector: 'rg-abstract-control',
    templateUrl: './abstract-control.component.html',
    styleUrls: ['./abstract-control.component.scss']
})
export class AbstractControlComponent {
    @Input() form: FormGroup;
    @Input() group: FormGroup;
    @Input() data: BaseControl;
    @Output() fieldChange: EventEmitter<any> = new EventEmitter();
    types = controlTypes;

    constructor() {
    }

    handleFieldChange(data: any): void {
        this.fieldChange.emit(data);
    }
}

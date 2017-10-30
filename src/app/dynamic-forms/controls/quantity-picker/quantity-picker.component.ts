import {Component, Input, Output, EventEmitter} from '@angular/core';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-quantity-picker',
    templateUrl: './quantity-picker.component.html',
    styleUrls: ['./quantity-picker.component.scss']
})
export class QuantityPickerComponent {
    @Input() data: BaseControl<any>;
    @Output() change: EventEmitter<any> = new EventEmitter();

    private formData: { [key: string]: number };

    constructor() {
    }

    handleChange(data) {
        this.formData = {
            ...this.formData,
            ...data
        };
        this.change.emit({
            [this.data.name]: this.formData
        });
    }
}

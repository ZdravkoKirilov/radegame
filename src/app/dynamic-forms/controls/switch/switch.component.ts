import {Component, Input, Output, EventEmitter} from '@angular/core';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
    @Input() data: BaseControl;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    handleChange(event) {
        this.change.emit({
            [this.data.name]: event.checked
        });
    }

}

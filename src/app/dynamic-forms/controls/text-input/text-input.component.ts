import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';

@Component({
    selector: 'rg-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<any> = new EventEmitter();
    value: string;

    constructor() {
    }

    get isValid() {
        return true;
    }

    handleChange(event: any) {
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

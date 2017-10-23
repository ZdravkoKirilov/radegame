import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

    constructor() {
    }

    @Input() data: BaseControl<any>;
    @Input() form: FormGroup;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    public _sliderValue: number;

    set sliderValue(value) {
        value = Number(value);
        value = value > this.data.max ? this.data.max : value;
        this._sliderValue = value;
        this.change.emit({[this.data.name]: value});
    }

    get sliderValue() {
        return this._sliderValue;
    }

    ngOnInit() {
        this.sliderValue = this.data.value;
    }
}

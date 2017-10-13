import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'rg-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

    constructor() {
    }

    @Input() max: number;
    @Input() min: number;
    @Input() step: number;
    @Input() label: string;
    @Input() name: string;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    public _sliderValue: number;
    set sliderValue(value) {
        value = Number(value);
        value = value > this.max ? this.max : value;
        this._sliderValue = value;
        this.change.emit({[this.name]: value});
    }

    get sliderValue() {
        return this._sliderValue;
    }

    ngOnInit() {
        this.sliderValue = this.min;
    }
}

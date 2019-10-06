import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';


@Component({
	selector: 'rg-color-picker',
	templateUrl: './color-picker.component.html',
	styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

	@Input() data: BaseControl;
	@Input() form: FormGroup;
	@Output() change: EventEmitter<any> = new EventEmitter();

	color: any;

	handleChange(color: string) {
		this.change.emit({
			[this.data.name]: color
		});
	}

	ngOnInit() {
		this.color = (this.data.value);
	}
}

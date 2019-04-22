import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';
import { KEYCODES } from '../../../shared/config/keyboard';

@Component({
	selector: 'rg-file-picker',
	templateUrl: './file-picker.component.html',
	styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent implements OnInit {

	constructor(private sanitizer: DomSanitizer) {
	}

	@Input() form: FormGroup;
	@Input() data: BaseControl = {};
	@Output() change: EventEmitter<BaseControl> = new EventEmitter();
	@ViewChild('filePicker') filePicker: ElementRef;
	@ViewChild('ownForm') ownForm: ElementRef;

	get label() {
		const label = this.data.label || 'Add File';
		return this.data.required ? label + ' *' : label;
	}

	existingFile?: any;
	file: File;

	ngOnInit() {
		this.existingFile = this.data.value;
	}

	browseFile() {
		this.filePicker.nativeElement.click();
	}

	removeFile() {
		const payload = { [this.data.name]: null };
		this.existingFile = null;
		this.file = null;
		this.change.emit(payload);
	}

	handleFile(event) {
		event.stopPropagation();
		const file = event.currentTarget.files[0];
		this.file = file;
		if (file) {
			if (this.data.asBase64) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = (event: any) => {
					this.existingFile = event.target.result;
					const payload = { [this.data.name]: event.currentTarget.result };
					this.change.emit(payload);
				}
			} else {
				this.existingFile = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
				const payload = { [this.data.name]: file };
				this.change.emit(payload);
			}
		}
	}

	handleKeyPress(event: KeyboardEvent) {
		if (event.keyCode === KEYCODES.ENTER) {
			this.browseFile();
		}
		if (event.keyCode === KEYCODES.DELETE) {
			this.removeFile();
		}
	}

}

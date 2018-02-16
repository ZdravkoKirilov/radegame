import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base.model';
import { KEYCODES } from '../../../shared/config/keyboard';

@Component({
    selector: 'rg-image-picker',
    templateUrl: './image-picker.component.html',
    styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

    constructor(private sanitizer: DomSanitizer) {
    }

    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<BaseControl> = new EventEmitter();
    @ViewChild('filePicker') filePicker: ElementRef;
    @ViewChild('ownForm') ownForm: ElementRef;

    existingImage?: any;

    ngOnInit() {
        this.existingImage = this.data.value;
    }

    browseImage() {
        this.filePicker.nativeElement.click();
    }

    removeImage() {
        const payload = { [this.data.name]: null };
        this.existingImage = null;
        this.change.emit(payload);
        //this.ownForm.nativeElement.reset();
    }

    handleImage(event) {
        event.stopPropagation();
        const file = event.currentTarget.files[0];
        if (file) {
            this.existingImage = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
            const payload = { [this.data.name]: file };
            this.change.emit(payload);
            //this.ownForm.nativeElement.reset();
        }
    }

    handleKeyPress(event: KeyboardEvent) {
        if (event.keyCode === KEYCODES.ENTER) {
            this.browseImage();
        }
        if (event.keyCode === KEYCODES.DELETE) {
            this.removeImage();
        }
    }

}

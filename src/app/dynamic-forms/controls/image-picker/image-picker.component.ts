import {Component, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';

import {BaseControl} from '../../models/Base.model';

@Component({
    selector: 'rg-image-picker',
    templateUrl: './image-picker.component.html',
    styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {

    @Input() data: BaseControl;
    @Output() change: EventEmitter<BaseControl> = new EventEmitter();
    @ViewChild('filePicker') filePicker: ElementRef;
    @ViewChild('form') form: ElementRef;

    readonly returnTypes = {
        BASE64: 'base64',
        BLOB: 'blob'
    };

    browseImage() {
        this.filePicker.nativeElement.click();
    }

    handleImage(event) {
        event.stopPropagation();
        const file = event.currentTarget.files[0];
        if (file) {
            this.change.emit(file);
            this.form.nativeElement.reset();
        }
    }

    constructor() {
    }
}

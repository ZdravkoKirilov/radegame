import {Component, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-image-picker',
    templateUrl: './image-picker.component.html',
    styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {

    @Input() data: BaseControl<string>;
    @Output() change: EventEmitter<BaseControl<any>> = new EventEmitter();
    @ViewChild('filePicker') filePicker: ElementRef;
    @ViewChild('form') form: ElementRef;

    readonly returnTypes = {
        BASE64: 'base64'
    };

    browseImage() {
        this.filePicker.nativeElement.click();
    }

    handleImage(event) {
        event.stopPropagation();
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.change.emit(reader.result);
                this.form.nativeElement.reset();
            };
            switch (this.data.returnType) {
                case this.returnTypes.BASE64:
                    reader.readAsDataURL(file);
                    break;
                default:
                    reader.readAsDataURL(file);
                    break;
            }
        }
    }

    constructor() {
    }
}

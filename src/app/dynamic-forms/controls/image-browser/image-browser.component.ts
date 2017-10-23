import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-image-browser',
    templateUrl: './image-browser.component.html',
    styleUrls: ['./image-browser.component.scss']
})
export class ImageBrowserComponent {

    constructor() {
    }

    readonly returnTypes = {
        BASE64: 'base64'
    };
    @Input() form: FormGroup;
    @Input() data: BaseControl<string>;
    @Output() change: EventEmitter<BaseControl<any>> = new EventEmitter();

    config = {clickable: true, addRemoveLinks: true};

    imageAdded(file) {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.change.emit({
                    [this.data.name]: reader.result
                });
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

}

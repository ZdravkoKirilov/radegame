import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base';

@Component({
    selector: 'rg-image-browser',
    templateUrl: './image-browser.component.html',
    styleUrls: ['./image-browser.component.scss']
})
export class ImageBrowserComponent implements OnInit {

    readonly returnTypes = {
        BASE64: 'base64'
    };
    @Input() form: FormGroup;
    @Input() data: BaseControl<string>;
    @Output() change: EventEmitter<BaseControl<any>> = new EventEmitter();

    config = { clickable: true, addRemoveLinks: true };
    prepopulatedImage?: string;

    imageAdded(file) {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.prepopulatedImage = null;
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

    imageRemoved() {
        this.prepopulatedImage = null;
        this.change.emit({
            [this.data.name]: null
        });
    }

    ngOnInit() {
        this.prepopulatedImage = this.form.controls[this.data.name].value;
    }

}

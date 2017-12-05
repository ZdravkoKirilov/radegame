import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';

@Component({
    selector: 'rg-image-browser',
    templateUrl: './image-browser.component.html',
    styleUrls: ['./image-browser.component.scss']
})
export class ImageBrowserComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<BaseControl> = new EventEmitter();

    config = {clickable: true, addRemoveLinks: true};
    prepopulatedImage?: string;

    imageAdded(file) {
        if (file) {
            this.prepopulatedImage = null;
            const payload = {[this.data.name]: file};
            this.change.emit(payload);
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

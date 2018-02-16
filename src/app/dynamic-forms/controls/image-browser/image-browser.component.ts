import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { BaseControl } from '../../models/Base.model';
import { KEYCODES } from '../../../shared/config/keyboard';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';

@Component({
    selector: 'rg-image-browser',
    templateUrl: './image-browser.component.html',
    styleUrls: ['./image-browser.component.scss'],
    // providers: [
    //     {
    //         provide: DROPZONE_CONFIG,
    //         useValue: {
    //             clickable: true, addRemoveLinks: true, 
    //         }
    //     }
    // ]
})
export class ImageBrowserComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() data: BaseControl;
    @Output() change: EventEmitter<BaseControl> = new EventEmitter();
    @ViewChild('imagebrowser') elem: ElementRef;
    @ViewChild('dropzone') dropzone: DropzoneComponent;

    config = { clickable: true, addRemoveLinks: true };
    prepopulatedImage?: string;

    imageAdded(file) {
        if (file) {
            this.prepopulatedImage = null;
            const payload = { [this.data.name]: file };
            this.change.emit(payload);
        }
    }

    imageRemoved() {
        this.prepopulatedImage = null;
        this.change.emit({
            [this.data.name]: null
        });
    }

    handleKeyPress(event: KeyboardEvent) {
        if (event.keyCode === KEYCODES.ENTER) {
            const dropzone = this.elem.nativeElement.querySelector('.dropzone');
            dropzone.click();
        }
        if (event.keyCode === KEYCODES.DELETE) {
            this.imageRemoved();
            this.dropzone.reset();
        }
    }

    ngOnInit() {
        this.prepopulatedImage = this.form.controls[this.data.name].value;
    }

}

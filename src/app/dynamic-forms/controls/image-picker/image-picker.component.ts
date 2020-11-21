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
  @Input() data: BaseControl = {} as any;
  @Output() change: EventEmitter<BaseControl> = new EventEmitter();
  @ViewChild('filePicker') filePicker: ElementRef;
  @ViewChild('ownForm') ownForm: ElementRef;

  get label() {
    const label = this.data.label || 'Add image';
    return this.data.required ? label + ' *' : label;
  }

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
    this.change.emit(payload as any);
  }

  handleImage(event: any) {
    event.stopPropagation();
    const file = event.currentTarget.files[0];
    if (file) {
      if (this.data.asBase64) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event: any) => {
          this.existingImage = event.target.result;
          const payload = { [this.data.name]: event.currentTarget.result };
          this.change.emit(payload as any);
        }
      } else {
        this.existingImage = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
        const payload = { [this.data.name]: file };
        this.change.emit(payload as any);
      }
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

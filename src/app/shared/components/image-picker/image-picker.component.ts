import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rg-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {
  constructor() { }
  readonly returnTypes = {
    BASE64: 'base64'
  }
  @Input() label: string = 'Drag image here or click to browse';
  @Input() config = { clickable: true, addRemoveLinks: true };
  @Input() returnType: string = 'base64';

  @Output() gotImage: EventEmitter<any> = new EventEmitter();

  imageAdded(file) {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.gotImage.emit(reader.result);
      };
      switch (this.returnType) {
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

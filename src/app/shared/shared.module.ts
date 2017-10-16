import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { SliderComponent } from './components/slider/slider.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from './config/config';

import { GameResourcesService } from './services/game-resources.service';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, DropzoneModule.forRoot(DROPZONE_CONFIG)
    ],
    exports: [
        SliderComponent, ImagePickerComponent
    ],
    declarations: [SliderComponent, ImagePickerComponent],
    providers: [GameResourcesService]
})
export class SharedModule { }
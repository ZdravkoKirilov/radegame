import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from './config/dropzone';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {AbstractControlComponent} from './components/abstract-control/abstract-control.component';
import { ControlsService } from './services/controls.service';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { ImageBrowserComponent } from './controls/image-browser/image-browser.component';
import { ButtonGroupComponent } from './controls/button-group/button-group.component';
import { SliderComponent } from './controls/slider/slider.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgMaterialModule,
        DropzoneModule.forRoot(DROPZONE_CONFIG)
    ],
    exports: [
        DynamicFormComponent
    ],
    declarations: [DynamicFormComponent, AbstractControlComponent, TextInputComponent, ImageBrowserComponent, ButtonGroupComponent, SliderComponent],
    providers: [
        ControlsService
    ]
})
export class DynamicFormsModule {
}

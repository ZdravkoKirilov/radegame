import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from './config/dropzone';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { AbstractControlComponent } from './components/abstract-control/abstract-control.component';
import { ControlsService } from './services/controls.service';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { ImageBrowserComponent } from './controls/image-browser/image-browser.component';
import { ButtonGroupComponent } from './controls/button-group/button-group.component';
import { SliderComponent } from './controls/slider/slider.component';
import { SwitchComponent } from './controls/switch/switch.component';
import { ImagePickerComponent } from './controls/image-picker/image-picker.component';
import { NestedFormComponent } from './components/nested-form/nested-form.component';
import { NumberInputComponent } from './controls/number-input/number-input.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { DropdownComponent } from './controls/dropdown/dropdown.component';
import { DynamicNestedFormComponent } from './components/dynamic-nested-form/dynamic-nested-form.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgMaterialModule,
        DropzoneModule.forRoot(DROPZONE_CONFIG)
    ],
    exports: [
        DynamicFormComponent, ImagePickerComponent
    ],
    declarations: [DynamicFormComponent,
        AbstractControlComponent,
        TextInputComponent,
        ImageBrowserComponent,
        ButtonGroupComponent,
        SliderComponent,
        SwitchComponent,
        ImagePickerComponent,
        NestedFormComponent,
        NumberInputComponent,
        FormArrayComponent,
        DropdownComponent,
        DynamicNestedFormComponent],
    providers: [
        ControlsService
    ]
})
export class DynamicFormsModule {
}

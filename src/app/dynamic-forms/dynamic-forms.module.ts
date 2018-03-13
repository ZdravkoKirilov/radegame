import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { AbstractControlComponent } from './components/abstract-control/abstract-control.component';
import { ControlsService } from './services/controls.service';
import { TextInputComponent } from './controls/text-input/text-input.component';
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
        SharedModule,
    ],
    exports: [
        DynamicFormComponent, ImagePickerComponent
    ],
    declarations: [DynamicFormComponent,
        AbstractControlComponent,
        TextInputComponent,
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

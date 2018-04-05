import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { DynamicFormComponent, AbstractControlComponent, FormArrayComponent, NestedFormComponent } from './components';
import { ControlsService } from './services/controls.service';
import { TextInputComponent, ButtonGroupComponent, ImagePickerComponent, NumberInputComponent, DropdownComponent } from './controls';

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [
        DynamicFormComponent, ImagePickerComponent
    ],
    declarations: [
        DynamicFormComponent,
        AbstractControlComponent,
        TextInputComponent,
        ButtonGroupComponent,
        ImagePickerComponent,
        NestedFormComponent,
        NumberInputComponent,
        FormArrayComponent,
        DropdownComponent,
    ],
    providers: [
        ControlsService
    ]
})
export class DynamicFormsModule {
}

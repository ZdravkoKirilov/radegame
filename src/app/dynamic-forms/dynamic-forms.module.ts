import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { DynamicFormComponent, AbstractControlComponent, FormArrayComponent, NestedFormComponent } from './components';
import { ControlsService } from './services/controls.service';
import { TextInputComponent, ButtonGroupComponent, ImagePickerComponent, NumberInputComponent, DropdownComponent, TagsInputComponent } from './controls';
import { FilePickerComponent } from './controls/file-picker/file-picker.component';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { CodeEditorComponent } from './controls/code-editor/code-editor.component';
import { EmbeddedDataComponent } from './controls/embedded-data/embedded-data.component';

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
        TagsInputComponent,
        FilePickerComponent,
        ColorPickerComponent,
        CodeEditorComponent,
        EmbeddedDataComponent,
    ],
    providers: [
        ControlsService
    ]
})
export class DynamicFormsModule {
}

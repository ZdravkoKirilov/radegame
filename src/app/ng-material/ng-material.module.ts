import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    MatStepperModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatSliderModule, MatCardModule, MatButtonToggleModule,
    MatMenuModule, MatSlideToggleModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSliderModule,
        MatCardModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatSlideToggleModule
    ],
    exports: [
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSliderModule,
        MatCardModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatSlideToggleModule
    ],
    declarations: []
})
export class NgMaterialModule {
}

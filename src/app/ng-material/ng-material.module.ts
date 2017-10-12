import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    MatStepperModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule
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
        MatCheckboxModule
    ],
    exports: [
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    declarations: []
})
export class NgMaterialModule {
}

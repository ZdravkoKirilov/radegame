import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatStepperModule, MatButtonModule, MatIconModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatStepperModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: []
})
export class NgMaterialModule {
}

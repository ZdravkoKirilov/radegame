import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatSliderModule, MatCardModule, MatButtonToggleModule,
    MatMenuModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatIconRegistry,
    MatDividerModule, MatToolbarModule, MatChipsModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
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
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTabsModule,
        MatDividerModule,
        MatToolbarModule,
        MatChipsModule
    ],
    exports: [
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
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTabsModule,
        MatDividerModule,
        MatToolbarModule,
        MatChipsModule
    ],
    declarations: [],
    providers: [

    ]
})
export class NgMaterialModule {
    constructor(public matIconRegistry: MatIconRegistry) {
        matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }
}

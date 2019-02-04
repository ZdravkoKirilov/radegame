import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    MatSelectModule, MatCheckboxModule, MatSliderModule, MatCardModule, MatButtonToggleModule,
    MatMenuModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatIconRegistry,
    MatDividerModule, MatToolbarModule, MatChipsModule, MatSidenavModule
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
        MatChipsModule,
        MatSidenavModule
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
        MatChipsModule,
        MatSidenavModule
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

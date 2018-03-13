import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { SocialButtonComponent } from './components/social-button/social-button.component';
import { DividerComponent } from './components/divider/divider.component';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule
    ],
    exports: [
        CommonModule,
        NgMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SocialButtonComponent,
        DividerComponent
    ],
    declarations: [SocialButtonComponent, DividerComponent],
    providers: []
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { DividerComponent, MainMenuComponent, SocialButtonComponent } from './components';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule
    ],
    exports: [
        CommonModule,
        NgMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DividerComponent, MainMenuComponent, SocialButtonComponent
    ],
    declarations: [DividerComponent, MainMenuComponent, SocialButtonComponent],
    providers: []
})
export class SharedModule {
}

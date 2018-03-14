import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { SocialButtonComponent } from './components/social-button/social-button.component';
import { DividerComponent } from './components/divider/divider.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

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
        DividerComponent,
        MainMenuComponent,
    ],
    declarations: [SocialButtonComponent, DividerComponent, MainMenuComponent],
    providers: []
})
export class SharedModule {
}

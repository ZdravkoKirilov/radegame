import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import * as components from './components';

import { AuthInterceptor } from '../core';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule
    ],
    exports: [
        CommonModule,
        NgMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ...Object.values(components)
    ],
    declarations: [...Object.values(components)],
    providers: []
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgMaterialModule} from '../ng-material/ng-material.module';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: []
})
export class SharedModule {
}

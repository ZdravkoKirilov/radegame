import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgMaterialModule} from '../ng-material/ng-material.module';

import { GameEditService } from './services/game-edit.service';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule, HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [GameEditService]
})
export class SharedModule {
}
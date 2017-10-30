import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgMaterialModule} from '../ng-material/ng-material.module';

import { GameEditService } from './services/game-edit.service';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule
    ],
    exports: [],
    declarations: [],
    providers: [GameEditService]
})
export class SharedModule {
}
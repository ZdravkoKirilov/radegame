import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import { GameCreatorModule } from '../game-creator/game-creator.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        GameCreatorModule
    ],
    declarations: []
})
export class CoreModule {
}

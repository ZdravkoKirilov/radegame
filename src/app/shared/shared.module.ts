import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgMaterialModule} from '../ng-material/ng-material.module';

import {GameResourcesService} from './services/game-resources.service';
import {GameCharactersService} from './services/game-characters.service';
import {GameTriviaService} from './services/game-trivia.service';
import {BoardFieldsService} from './services/board-fields.service';

@NgModule({
    imports: [
        CommonModule, NgMaterialModule, FormsModule
    ],
    exports: [],
    declarations: [],
    providers: [GameResourcesService, GameCharactersService, GameTriviaService, BoardFieldsService]
})
export class SharedModule {
}
import {FEATURE_NAME} from './config';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {GameResourcesEffectsService} from './state/effects/game-resources-effects.service';
import {GameCharactersEffectsService} from './state/effects/game-characters-effects.service';
import {GameTriviaEffectsService} from './state/effects/game-trivia-effects.service';

import {IndexComponent} from './index/index.component';
import {RouterModule} from '@angular/router';
import {routes} from './routing';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state/reducers/index';

import {NgMaterialModule} from '../ng-material/ng-material.module';
import {GameElementsModule} from '../game-elements/game-elements.module';
import {GeneralSettingsComponent} from './components/general-settings/general-settings.component';
import {ResourcesComponent} from './components/resources/resources.component';
import {CharactersComponent} from './components/characters/characters.component';
import {FieldsComponent} from './components/fields/fields.component';
import {TriviaComponent} from './components/trivia/trivia.component';
import {TrapsComponent} from './components/traps/traps.component';
import {ResolutionsComponent} from './components/resolutions/resolutions.component';
import {TurnFlowComponent} from './components/turn-flow/turn-flow.component';
import {ResourceEditorComponent} from './components/resource-editor/resource-editor.component';
import {SharedModule} from '../shared/shared.module';
import {SmartGeneralSettingsComponent} from './containers/smart-general-settings/smart-general-settings.component';
import {SmartResourceEditorComponent} from './containers/smart-resource-editor/smart-resource-editor.component';
import {SmartResourcesComponent} from './containers/smart-resources/smart-resources.component';
import {ResourcesListComponent} from './components/resources-list/resources-list.component';
import {SmartCharactersComponent} from './containers/smart-characters/smart-characters.component';
import {SmartCharacterEditorComponent} from './containers/smart-character-editor/smart-character-editor.component';
import {CharactersListComponent} from './components/characters-list/characters-list.component';
import {CharacterEditorComponent} from './components/character-editor/character-editor.component';
import {GameBoardListComponent} from './components/game-board-list/game-board-list.component';
import {GameLaunchComponent} from './components/game-launch/game-launch.component';
import {SmartTriviaComponent} from './containers/smart-trivia/smart-trivia.component';
import {SmartTriviaEditorComponent} from './containers/smart-trivia-editor/smart-trivia-editor.component';
import {TriviaEditorComponent} from './components/trivia-editor/trivia-editor.component';
import {TriviasListComponent} from './components/trivias-list/trivias-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forRoot([GameResourcesEffectsService, GameCharactersEffectsService, GameTriviaEffectsService]),
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        GameElementsModule,
        NgMaterialModule
    ],
    exports: [
        RouterModule,
        SharedModule
    ],
    declarations: [IndexComponent, GeneralSettingsComponent, ResourcesComponent, CharactersComponent, FieldsComponent,
        TriviaComponent, TrapsComponent, ResolutionsComponent, TurnFlowComponent, ResourceEditorComponent, SmartGeneralSettingsComponent, SmartResourceEditorComponent, SmartResourcesComponent, ResourcesListComponent, SmartCharactersComponent, SmartCharacterEditorComponent, CharactersListComponent, CharacterEditorComponent, GameBoardListComponent, GameLaunchComponent, SmartTriviaComponent, SmartTriviaEditorComponent, TriviaEditorComponent, TriviasListComponent]
})
export class GameEditorModule {
}
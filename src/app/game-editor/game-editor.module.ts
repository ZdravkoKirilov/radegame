import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';

import {FEATURE_NAME} from './configs/config';
import {GameEditEffectsService} from './state/effects/game-edit-effects.service';

import {IndexComponent} from './index/index.component';

import {routes} from './routing';
import {reducers} from './state/reducers/index';
import {metaReducers} from './state/reducers/index';

import {NgMaterialModule} from '../ng-material/ng-material.module';
import {GameElementsModule} from '../game-elements/game-elements.module';
import {DynamicFormsModule} from '../dynamic-forms/dynamic-forms.module';
import {RenderingService} from '../game-mechanics/services/rendering.service';

import {GeneralSettingsComponent} from './components/general-settings/general-settings.component';
import {ResourcesComponent} from './components/Resource/resources/resources.component';
import {CharactersComponent} from './components/Character/characters/characters.component';
import {FieldsComponent} from './components/Field/fields/fields.component';
import {TriviaComponent} from './components/Trivia/trivias/trivia.component';
import {TrapsComponent} from './components/traps/traps.component';
import {ResolutionsComponent} from './components/resolutions/resolutions.component';
import {TurnFlowComponent} from './components/turn-flow/turn-flow.component';
import {ResourceEditorComponent} from './components/Resource/resource-editor/resource-editor.component';
import {SharedModule} from '../shared/shared.module';
import {SmartGeneralSettingsComponent} from './containers/smart-general-settings/smart-general-settings.component';
import {SmartResourceEditorComponent} from './containers/smart-resource-editor/smart-resource-editor.component';
import {SmartResourcesComponent} from './containers/smart-resources/smart-resources.component';
import {ResourcesListComponent} from './components/Resource/resources-list/resources-list.component';
import {SmartCharactersComponent} from './containers/smart-characters/smart-characters.component';
import {SmartCharacterEditorComponent} from './containers/smart-character-editor/smart-character-editor.component';
import {CharactersListComponent} from './components/Character/characters-list/characters-list.component';
import {CharacterEditorComponent} from './components/Character/character-editor/character-editor.component';
import {GameLaunchComponent} from './components/Launch/game-launch/game-launch.component';
import {SmartTriviaComponent} from './containers/smart-trivia/smart-trivia.component';
import {SmartTriviaEditorComponent} from './containers/smart-trivia-editor/smart-trivia-editor.component';
import {TriviaEditorComponent} from './components/Trivia/trivia-editor/trivia-editor.component';
import {TriviasListComponent} from './components/Trivia/trivias-list/trivias-list.component';
import {FieldEditorComponent} from './components/Field/field-editor/field-editor.component';
import {EmptySlotComponent} from './components/Field/Grid/empty-slot/empty-slot.component';
import {GridEditorComponent} from './components/Field/Grid/grid-editor/grid-editor.component';
import {GridFieldComponent} from './components/Field/Grid/grid-field/grid-field.component';
import {SmartGridEditorComponent} from './containers/smart-grid-editor/smart-grid-editor.component';
import {SmartFieldEditorComponent} from './containers/smart-field-editor/smart-field-editor.component';
import {SmartLaunchComponent} from './containers/smart-launch/smart-launch.component';
import {GamesListComponent} from './components/Launch/games-list/games-list.component';
import {MapEditorComponent} from './components/Field/Map/map-editor/map-editor.component';
import {SmartMapEditorComponent} from './containers/smart-map-editor/smart-map-editor.component';
import {MapFieldComponent} from './components/Field/Map/map-field/map-field.component';
import {MapToolbarComponent} from './components/Field/Map/map-toolbar/map-toolbar.component';
import {SmartFieldsComponent} from './containers/smart-fields/smart-fields.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers, {metaReducers}),
        EffectsModule.forRoot([
            GameEditEffectsService
        ]),
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsModule,
        RouterModule.forChild(routes),
        GameElementsModule,
        NgMaterialModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        RenderingService
    ],
    declarations: [IndexComponent, GeneralSettingsComponent, ResourcesComponent, CharactersComponent,
        FieldsComponent, TriviaComponent, TrapsComponent, ResolutionsComponent, TurnFlowComponent,
        ResourceEditorComponent, SmartGeneralSettingsComponent, SmartResourceEditorComponent,
        SmartResourcesComponent, ResourcesListComponent, SmartCharactersComponent,
        SmartCharacterEditorComponent, CharactersListComponent, CharacterEditorComponent,
        GameLaunchComponent, SmartTriviaComponent,
        SmartTriviaEditorComponent, TriviaEditorComponent, TriviasListComponent, FieldEditorComponent,
        EmptySlotComponent, GridFieldComponent, GridEditorComponent, SmartGridEditorComponent,
        SmartFieldEditorComponent,
        SmartLaunchComponent,
        GamesListComponent,
        MapEditorComponent,
        SmartMapEditorComponent,
        MapFieldComponent,
        MapToolbarComponent,
        SmartFieldsComponent
    ]
})
export class GameEditorModule {
}

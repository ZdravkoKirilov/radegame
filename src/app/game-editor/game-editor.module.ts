import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { FEATURE_NAME } from './utils/config';
import { GameEditEffectsService } from './state/effects/game-edit-effects.service';

import { IndexComponent } from './containers/index/index.component';

import { routes } from './routing';
import { reducers } from './state/reducers/index';
import { metaReducers } from './state/reducers/index';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { GameElementsModule } from '../game-elements/game-elements.module';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { SceneRenderService } from '../game-mechanics/rendering/scene-render.service';
import { GameResolverService } from './resolvers/game-resolver.service';
import { GamesListResolverService } from './resolvers/games-list-resolver.service';
import { GameEditService } from './services/game-edit.service';

import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ResourcesComponent } from './components/Resource/resources/resources.component';
import { FactionsComponent } from './components/Faction/factions/factions.component';
import { FieldsComponent } from './components/Field/fields/fields.component';
import { TriviaComponent } from './components/Trivia/trivias/trivia.component';
import { TrapsComponent } from './components/traps/traps.component';
import { ResolutionsComponent } from './components/resolutions/resolutions.component';
import { TurnFlowComponent } from './components/turn-flow/turn-flow.component';
import { ResourceEditorComponent } from './components/Resource/resource-editor/resource-editor.component';
import { SharedModule } from '../shared/shared.module';
import { SmartGeneralSettingsComponent } from './containers/smart-general-settings/smart-general-settings.component';
import { SmartResourceEditorComponent } from './containers/smart-resource-editor/smart-resource-editor.component';
import { SmartResourcesComponent } from './containers/smart-resources/smart-resources.component';
import { ResourcesListComponent } from './components/Resource/resources-list/resources-list.component';
import { SmartFactionsComponent } from './containers/smart-factions/smart-factions.component';
import { SmartFactionEditorComponent } from './containers/smart-faction-editor/smart-faction-editor.component';
import { FactionsListComponent } from './components/Faction/factions-list/factions-list.component';
import { FactionEditorComponent } from './components/Faction/faction-editor/faction-editor.component';
import { GameLaunchComponent } from './components/Launch/game-launch/game-launch.component';
import { SmartTriviaComponent } from './containers/smart-trivia/smart-trivia.component';
import { SmartTriviaEditorComponent } from './containers/smart-trivia-editor/smart-trivia-editor.component';
import { TriviaEditorComponent } from './components/Trivia/trivia-editor/trivia-editor.component';
import { TriviasListComponent } from './components/Trivia/trivias-list/trivias-list.component';
import { FieldEditorComponent } from './components/Field/field-editor/field-editor.component';
import { EmptySlotComponent } from './components/Field/Grid/empty-slot/empty-slot.component';
import { GridEditorComponent } from './components/Field/Grid/grid-editor/grid-editor.component';
import { GridFieldComponent } from './components/Field/Grid/grid-field/grid-field.component';
import { SmartGridEditorComponent } from './containers/smart-grid-editor/smart-grid-editor.component';
import { SmartFieldEditorComponent } from './containers/smart-field-editor/smart-field-editor.component';
import { SmartLaunchComponent } from './containers/smart-launch/smart-launch.component';
import { GamesListComponent } from './components/Launch/games-list/games-list.component';
import { MapEditorComponent } from './components/Field/Map/map-editor/map-editor.component';
import { SmartMapEditorComponent } from './containers/smart-map-editor/smart-map-editor.component';
import { MapFieldComponent } from './components/Field/Map/map-field/map-field.component';
import { MapToolbarComponent } from './components/Field/Map/map-toolbar/map-toolbar.component';
import { SmartFieldsComponent } from './containers/smart-fields/smart-fields.component';
import { MapPathComponent } from './components/Field/Map/map-path/map-path.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers, {metaReducers}),
        EffectsModule.forFeature([
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
        SceneRenderService,
        GameResolverService,
        GamesListResolverService,
        GameEditService
    ],
    declarations: [IndexComponent, GeneralSettingsComponent, ResourcesComponent, FactionsComponent,
        FieldsComponent, TriviaComponent, TrapsComponent, ResolutionsComponent, TurnFlowComponent,
        ResourceEditorComponent, SmartGeneralSettingsComponent, SmartResourceEditorComponent,
        SmartResourcesComponent, ResourcesListComponent, SmartFactionsComponent,
        SmartFactionEditorComponent, FactionsListComponent, FactionEditorComponent,
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
        SmartFieldsComponent,
        MapPathComponent
    ]
})
export class GameEditorModule {
}

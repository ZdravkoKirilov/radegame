import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { FEATURE_NAME } from './utils/config';
import { effects } from './state/effects/index';

import { IndexComponent } from './components/index/index.component';

import { routes } from './routing';
import { reducers } from './state/reducers/index';
import { metaReducers } from './state/reducers/index';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { GameEditService } from './services/game-edit.service';
import * as fromGuards from './guards';

import { ResourcesComponent } from './components/Resource/resources/resources.component';
import { FactionsComponent } from './components/Faction/factions/factions.component';
import { FieldsComponent } from './components/Field/fields/fields.component';
import { ResourceEditorComponent } from './components/Resource/resource-editor/resource-editor.component';
import { SharedModule } from '../shared/shared.module';
import { SmartResourcesComponent } from './containers/smart-resources/smart-resources.component';
import { ResourcesListComponent } from './components/Resource/resources-list/resources-list.component';
import { SmartFactionsComponent } from './containers/smart-factions/smart-factions.component';
import { FactionsListComponent } from './components/Faction/factions-list/factions-list.component';
import { FactionEditorComponent } from './components/Faction/faction-editor/faction-editor.component';
import { GameLaunchComponent } from './components/Launch/game-launch/game-launch.component';
import { FieldEditorComponent } from './components/Field/field-editor/field-editor.component';
import { SmartLaunchComponent } from './containers/smart-launch/smart-launch.component';
import { GamesListComponent } from './components/Launch/games-list/games-list.component';
import { MapEditorComponent } from './components/Field/Map/map-editor/map-editor.component';
import { MapFieldComponent } from './components/Field/Map/map-field/map-field.component';
import { MapToolbarComponent } from './components/Field/Map/map-toolbar/map-toolbar.component';
import { SmartFieldsComponent } from './containers/smart-fields/smart-fields.component';
import { MapPathComponent } from './components/Field/Map/map-path/map-path.component';
import { SmartActivitiesComponent } from './containers/smart-activities/smart-activities.component';
import { GameActionsListComponent } from './components/Activity/activities-list/activities-list.component';
import { GameActionsComponent } from './components/Activity/activities/activities.component';
import { GameActionEditorComponent } from './components/Activity/activity-editor/activity-editor.component';
import { SmartQuestsComponent } from './containers/smart-quests/smart-quests.component';
import { QuestsComponent } from './components/Quest/quests/quests.component';
import { QuestEditorComponent } from './components/Quest/quest-editor/quest-editor.component';
import { QuestsListComponent } from './components/Quest/quests-list/quests-list.component';
import { SmartRoundsComponent } from './containers/smart-rounds/smart-rounds.component';
import { RoundsComponent } from './components/Round/rounds/rounds.component';
import { RoundsListComponent } from './components/Round/rounds-list/rounds-list.component';
import { RoundEditorComponent } from './components/Round/round-editor/round-editor.component';
import { SmartTriviaComponent } from './containers/smart-trivia/smart-trivia.component';
import { TriviaComponent } from './components/Trivia/trivia/trivia.component';
import { TriviaListComponent } from './components/Trivia/trivia-list/trivia-list.component';
import { TriviaEditorComponent } from './components/Trivia/trivia-editor/trivia-editor.component';
import { StagesComponent } from './components/Stage/stages/stages.component';
import { StagesListComponent } from './components/Stage/stages-list/stages-list.component';
import { StageEditorComponent } from './components/Stage/stage-editor/stage-editor.component';
import { SmartStagesComponent } from './containers/smart-stages/smart-stages.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers, {metaReducers}),
        EffectsModule.forFeature([
            ...effects
        ]),
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsModule,
        RouterModule.forChild(routes),
        NgMaterialModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        GameEditService,
        ...fromGuards.guards
    ],
    declarations: [
        IndexComponent,
        ResourcesComponent,
        FactionsComponent,
        FieldsComponent,
        ResourceEditorComponent,
        SmartResourcesComponent,
        ResourcesListComponent,
        SmartFactionsComponent,
        FactionsListComponent,
        FactionEditorComponent,
        GameLaunchComponent,
        FieldEditorComponent,
        SmartLaunchComponent,
        GamesListComponent,
        MapEditorComponent,
        MapFieldComponent,
        MapToolbarComponent,
        SmartFieldsComponent,
        MapPathComponent,
        SmartActivitiesComponent,
        GameActionsListComponent,
        GameActionsComponent,
        GameActionEditorComponent,
        SmartQuestsComponent,
        QuestsComponent,
        QuestEditorComponent,
        QuestsListComponent,
        SmartRoundsComponent,
        RoundsComponent,
        RoundsListComponent,
        RoundEditorComponent,
        SmartTriviaComponent,
        TriviaComponent,
        TriviaListComponent,
        TriviaEditorComponent,
        StagesComponent,
        StagesListComponent,
        StageEditorComponent,
        SmartStagesComponent
    ]
})
export class GameEditorModule {
}

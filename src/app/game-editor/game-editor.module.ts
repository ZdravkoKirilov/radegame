import { FEATURE_NAME } from './config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { GameResourcesEffectsService } from './state/effects/game-resources-effects.service';

import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/reducers/index';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { GameElementsModule } from '../game-elements/game-elements.module';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { CharactersComponent } from './components/characters/characters.component';
import { FieldsComponent } from './components/fields/fields.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { TrapsComponent } from './components/traps/traps.component';
import { ResolutionsComponent } from './components/resolutions/resolutions.component';
import { TurnFlowComponent } from './components/turn-flow/turn-flow.component';
import { ResourceEditorComponent } from './components/resource-editor/resource-editor.component';
import { SharedModule } from '../shared/shared.module';
import { SmartGeneralSettingsComponent } from './containers/smart-general-settings/smart-general-settings.component';
import { SmartResourceEditorComponent } from './containers/smart-resource-editor/smart-resource-editor.component';
import { SmartResourcesComponent } from './containers/smart-resources/smart-resources.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forRoot([GameResourcesEffectsService]),
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
        TriviaComponent, TrapsComponent, ResolutionsComponent, TurnFlowComponent, ResourceEditorComponent, SmartGeneralSettingsComponent, SmartResourceEditorComponent, SmartResourcesComponent, ResourcesListComponent]
})
export class GameEditorModule {
}

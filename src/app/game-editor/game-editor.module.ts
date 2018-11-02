import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { FEATURE_NAME } from './utils';

import { routes } from './routing';
import { reducers, metaReducers, GenericEffectsService } from './state';

import { DynamicFormsModule } from '@app/dynamic-forms';
import { SharedModule } from '@app/shared';

import {
    EntityListComponent, EntityComponent, EntityEditorComponent, EntityViewComponent,
    FieldsComponent, MapEditorComponent, MapFieldComponent, MapPathComponent, MapToolbarComponent, IndexComponent
} from './components';

import {
    EditorContainerComponent, ActionsContainerComponent, FactionsContainerComponent, FieldsContainerComponent,
    GamesContainerComponent, ConditionsContainerComponent, ResourcesContainerComponent, RoundsContainerComponent,
    StagesContainerComponent, ChoicesContainerComponent, StackContainerComponent, PoolsContainerComponent,
    TeamsContainerComponent, TokensContainerComponent, PhasesContainerComponent,
} from './containers';
import { MapRenderService } from './services';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers, { metaReducers }),
        EffectsModule.forFeature([
            GenericEffectsService
        ]),
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
    providers: [MapRenderService],
    declarations: [
        EntityListComponent,
        EntityComponent,
        EntityEditorComponent,
        EntityViewComponent,
        MapEditorComponent,
        MapFieldComponent,
        MapPathComponent,
        MapToolbarComponent,
        FieldsComponent,
        IndexComponent,
        ActionsContainerComponent,
        FactionsContainerComponent,
        EditorContainerComponent,
        FieldsContainerComponent,
        GamesContainerComponent,
        ConditionsContainerComponent,
        ResourcesContainerComponent,
        RoundsContainerComponent,
        StagesContainerComponent,
        ChoicesContainerComponent,
        StackContainerComponent,
        PoolsContainerComponent,
        TeamsContainerComponent,
        TokensContainerComponent,
        PhasesContainerComponent
    ]
})
export class GameEditorModule {
}

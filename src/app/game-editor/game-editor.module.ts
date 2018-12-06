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
    EntityListComponent, EntityComponent, EntityEditorComponent, EntityViewComponent, IndexComponent
} from './components';

import {
    EditorContainerComponent, ActionsContainerComponent, FactionsContainerComponent, FieldsContainerComponent,
    GamesContainerComponent, ConditionsContainerComponent, RoundsContainerComponent,
    StagesContainerComponent, ChoicesContainerComponent,
    TeamsContainerComponent, TokensContainerComponent, PhasesContainerComponent, BoardContainerComponent
} from './containers';
import { BoardEditService } from './services';
import { BoardEditorComponent } from './components/board/board-editor.component';
import { BoardToolbarComponent } from './components/board/toolbar/board-toolbar.component';
import { BoardMainComponent } from './components/board/main/board-main.component';
import { SourcesContainerComponent } from './containers/sources/sources-container.component';

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
    providers: [BoardEditService],
    declarations: [
        EntityListComponent,
        EntityComponent,
        EntityEditorComponent,
        EntityViewComponent,
        IndexComponent,
        ActionsContainerComponent,
        FactionsContainerComponent,
        EditorContainerComponent,
        FieldsContainerComponent,
        GamesContainerComponent,
        ConditionsContainerComponent,
        RoundsContainerComponent,
        StagesContainerComponent,
        ChoicesContainerComponent,
        TeamsContainerComponent,
        TokensContainerComponent,
        PhasesContainerComponent,
        BoardEditorComponent,
        BoardContainerComponent,
        BoardToolbarComponent,
        BoardMainComponent,
        SourcesContainerComponent
    ]
})
export class GameEditorModule {
}

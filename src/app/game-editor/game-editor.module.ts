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
    EntityListComponent, EntityComponent, EntityEditorComponent, EntityViewComponent
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
import { ImageAssetContainerComponent } from './containers/images/image-asset-container.component';
import { EditorLayoutComponent, EditSidebarComponent, EditSidebarNavComponent, EditSidebarHeaderComponent, EditSidebarLinkComponent } from './layouts';
import { EditHeaderComponent } from './components/header/edit-header.component';
import { KeywordsContainerComponent } from './containers/keywords/keywords-container.component';
import { GroupsContainerComponent } from './containers/groups/groups-container.component';
import { StylesContainerComponent } from './containers/styles/styles-container.component';
import { SoundsContainerComponent } from './containers/sounds/sounds-container.component';
import { StatesContainerComponent } from './containers/states/states-container.component';

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
        SourcesContainerComponent,
        ImageAssetContainerComponent,
        EditorLayoutComponent,
        EditHeaderComponent,
        EditSidebarComponent,
        EditSidebarNavComponent,
        EditSidebarHeaderComponent,
        EditSidebarLinkComponent,
        KeywordsContainerComponent,
        GroupsContainerComponent,
        StylesContainerComponent,
        SoundsContainerComponent,
        StatesContainerComponent,
    ]
})
export class GameEditorModule {
}

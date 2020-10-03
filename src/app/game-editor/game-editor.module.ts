import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { DynamicFormsModule } from '@app/dynamic-forms';
import { SharedModule } from '@app/shared';

import { FEATURE_NAME } from './utils';
import { routes } from './routing';
import { reducers, metaReducers, GameEffectsService, GenericEffectsService, VersionEffectsService } from './state';
import {
  EntityListComponent, EntityComponent, EntityEditorComponent, EntityViewComponent
} from './components';

import { BoardEditorComponent } from './components/board/board-editor.component';
import { BoardToolbarComponent } from './components/board/toolbar/board-toolbar.component';
import { BoardMainComponent } from './components/board/main/board-main.component';
import { EditorSidebarLayoutComponent, } from './layouts';
import { EditHeaderComponent } from './components/header/edit-header.component';
import { ShapeEditorComponent } from './components/shape/shape-editor.component';
import { ShapePreviewComponent } from './components/shape/preview/shape-preview.component';
import { TextEditorComponent } from './components/text/text-editor.component';
import { TextPreviewComponent } from './components/text/preview/text-preview.component';
import { TestBoardContainerComponent } from './containers/sandbox-editor/test-board-container.component';
import { TestBoardHeaderComponent } from './components/test-board/header/test-board-header.component';
import { TestBoardStateComponent } from './components/test-board/state-mocks/test-board-state.component';
import { TestBoardPresentationComponent } from './components/test-board/presentation/test-board-presentation.component';
import { EntityEditorContainerComponent } from './containers/entity-editor/entity-editor-container.component';
import { GamesEditorContainerComponent } from './containers/games-editor/games-editor-container.component';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { VersionsListComponent } from './containers/versions-list/versions-list.component';
import { VersionsEditorComponent } from './containers/versions-editor/versions-editor.component';
import { TreeEditorComponent } from './containers/tree-editor/tree-editor.component';
import { TreeExplorerComponent } from './containers/tree-explorer/tree-explorer.component';
import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { RootEntityEditorComponent } from './containers/root-entity-editor/root-entity-editor.component';
import { GamesContainerComponent } from './containers';
import { ModulePipe } from './utils/module.pipe';
import { NestedEntityEditorComponent } from './containers/nested-entity-editor/nested-entity-editor.component';
import { GenericFilterPipe } from './utils/generic-filter.pipe';
import { NodeEditorComponent } from './containers/node-editor/node-editor.component';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, reducers, { metaReducers }),
    EffectsModule.forFeature([
      GameEffectsService,
      VersionEffectsService,
      GenericEffectsService,
    ]),
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    BoardEditorComponent,
    BoardToolbarComponent,
    BoardMainComponent,
    EditorSidebarLayoutComponent,
    EditHeaderComponent,
    ShapeEditorComponent,
    ShapePreviewComponent,
    TextEditorComponent,
    TextPreviewComponent,
    TestBoardContainerComponent,
    TestBoardHeaderComponent,
    TestBoardStateComponent,
    TestBoardPresentationComponent,
    RootEntityEditorComponent,
    GameDashboardComponent,
    TreeExplorerComponent,
    TreeEditorComponent,
    VersionsEditorComponent,
    VersionsListComponent,
    ConfirmDeleteComponent,
    EditorToolbarComponent,
    GamesEditorContainerComponent,
    EntityEditorContainerComponent,
    EntityListComponent,
    EntityComponent,
    EntityEditorComponent,
    EntityViewComponent,
    GamesContainerComponent,
    ModulePipe,
    GenericFilterPipe,
    NestedEntityEditorComponent,
    NodeEditorComponent,
  ]
})
export class GameEditorModule {
}

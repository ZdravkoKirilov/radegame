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
    EditorContainerComponent, ActionsContainerComponent, FactionsContainerComponent,
    GamesContainerComponent, ConditionsContainerComponent, RoundsContainerComponent,
    StagesContainerComponent, ChoicesContainerComponent, TokensContainerComponent, BoardContainerComponent
} from './containers';

import { BoardEditorComponent } from './components/board/board-editor.component';
import { BoardToolbarComponent } from './components/board/toolbar/board-toolbar.component';
import { BoardMainComponent } from './components/board/main/board-main.component';
import { ImageAssetContainerComponent } from './containers/images/image-asset-container.component';
import { EditorLayoutComponent, EditSidebarComponent, EditSidebarNavComponent, EditSidebarHeaderComponent, EditSidebarLinkComponent } from './layouts';
import { EditHeaderComponent } from './components/header/edit-header.component';
import { StylesContainerComponent } from './containers/styles/styles-container.component';
import { SoundsContainerComponent } from './containers/sounds/sounds-container.component';
import { ExpressionsContainerComponent } from './containers/expressions/expressions-container.component';
import { AnimationsContainerComponent } from './containers/animations/animations-container.component';
import { SetupsContainerComponent } from './containers/setups/setups-container.component';
import { TransitionsContainerComponent } from './containers/transitions/transitions-container.component';
import { TextsContainerComponent } from './containers/texts/texts-container.component';
import { SonatasContainerComponent } from './containers/sonata/sonatas-container.component';
import { ShapesContainerComponent } from './containers/shapes/shapes-container.component';
import { ShapeEditorComponent } from './components/shape/shape-editor.component';
import { ShapePreviewComponent } from './components/shape/preview/shape-preview.component';

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
    declarations: [
        EntityListComponent,
        EntityComponent,
        EntityEditorComponent,
        EntityViewComponent,
        ActionsContainerComponent,
        FactionsContainerComponent,
        EditorContainerComponent,
        GamesContainerComponent,
        ConditionsContainerComponent,
        RoundsContainerComponent,
        StagesContainerComponent,
        ChoicesContainerComponent,
        TokensContainerComponent,
        BoardEditorComponent,
        BoardContainerComponent,
        BoardToolbarComponent,
        BoardMainComponent,
        ImageAssetContainerComponent,
        EditorLayoutComponent,
        EditHeaderComponent,
        EditSidebarComponent,
        EditSidebarNavComponent,
        EditSidebarHeaderComponent,
        EditSidebarLinkComponent,
        StylesContainerComponent,
        SoundsContainerComponent,
        ExpressionsContainerComponent,
        AnimationsContainerComponent,
        SetupsContainerComponent,
        TransitionsContainerComponent,
        TextsContainerComponent,
        SonatasContainerComponent,
        ShapesContainerComponent,
        ShapeEditorComponent,
        ShapePreviewComponent,
    ]
})
export class GameEditorModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { FEATURE_NAME } from './utils';

import { routes } from './routing';
import { reducers, metaReducers } from './state';

import { DynamicFormsModule } from '../dynamic-forms/';
import { SharedModule } from '../shared';
import * as effects from './state/effects/generics';

import * as components from './components';
import * as containers from './containers';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityComponent } from './components/entity/entity.component';
import { EntityEditorComponent } from './components/entity-editor/entity-editor.component';
import { EntityViewComponent } from './components/entity-view/entity-view.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_NAME, reducers, { metaReducers }),
        EffectsModule.forFeature([
            ...Object.values(effects)
        ]),
        FormsModule,
        ReactiveFormsModule,
        DynamicFormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
    providers: [],
    declarations: [
        ...Object.values(containers),
        ...Object.values(components),
        EntityListComponent,
        EntityComponent,
        EntityEditorComponent,
        EntityViewComponent
    ]
})
export class GameEditorModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { FEATURE_NAME } from './utils';

import { routes } from './routing';
import { reducers, metaReducers } from './state';

import { DynamicFormsModule } from '@app/dynamic-forms';
import { SharedModule } from '@app/shared';
import * as effects from './state/effects/generics';

import {
    EntityListComponent, EntityComponent, EntityEditorComponent, EntityViewComponent,
    FieldsComponent, MapEditorComponent, MapFieldComponent, MapPathComponent, MapToolbarComponent, IndexComponent
} from './components';

import {
    EditorWrapperComponent, SmartActivitiesComponent, SmartFactionsComponent, SmartFieldsComponent,
    SmartLaunchComponent, SmartQuestsComponent, SmartResourcesComponent, SmartRoundsComponent, SmartStagesComponent, SmartTriviaComponent
} from './containers';

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
        SmartActivitiesComponent,
        SmartFactionsComponent,
        EditorWrapperComponent,
        SmartFieldsComponent,
        SmartLaunchComponent,
        SmartQuestsComponent,
        SmartResourcesComponent,
        SmartRoundsComponent,
        SmartStagesComponent,
        SmartTriviaComponent
    ]
})
export class GameEditorModule {
}

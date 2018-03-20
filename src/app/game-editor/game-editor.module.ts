import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { FEATURE_NAME } from './utils/config';

import { routes } from './routing';
import { reducers, metaReducers } from './state';

import { DynamicFormsModule } from '../dynamic-forms/';
import { SharedModule } from '../shared';
import * as fromGuards from './guards';
import * as effects from './state/effects';

import * as components from './components';
import * as containers from './containers';

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
    providers: [
        ...Object.values(fromGuards),
    ],
    declarations: [
        ...Object.values(containers),
        ...Object.values(components)
    ]
})
export class GameEditorModule {
}

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as effects from './state/effects';

import { SharedModule } from '../shared';
import { routes } from './routing';

import { FEATURE_NAME } from './config';
import { profileReducer } from './state';

import * as containers from './containers';
import * as components from './components';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, profileReducer),
    EffectsModule.forFeature([...Object.values(effects)])
  ],
  exports: [
    RouterModule
  ],
  declarations: [...Object.values(containers), ...Object.values(components)]
})
export class ProfileModule { }

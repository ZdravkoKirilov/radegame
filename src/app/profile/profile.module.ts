import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as effects from './state/effects';

import { SharedModule } from '@app/shared';
import { routes } from './routing';

import { FEATURE_NAME } from './config';
import { profileReducer } from './state';

import { SignInComponent } from './containers';
import { SignInFormComponent, SignInViewComponent } from './components';

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
  declarations: [SignInFormComponent, SignInViewComponent, SignInComponent]
})
export class ProfileModule { }

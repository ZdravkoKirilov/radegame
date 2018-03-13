import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { AuthService, AuthServiceConfig } from './services';
import { socialConfig } from './utils';

import { routes } from './routing';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { FacebookSignInComponent } from './components/facebook-sign-in/facebook-sign-in.component';

import { socialAuthReducer } from './store';

const FEATURE_NAME = 'social_auth';

@NgModule({
  imports: [
    CommonModule,
    //NgMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(FEATURE_NAME, socialAuthReducer)
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useValue: socialConfig
    }
  ],
  declarations: [GoogleSignInComponent, FacebookSignInComponent],
  exports: [
    RouterModule
  ]
})
export class SocialAuthModule { }

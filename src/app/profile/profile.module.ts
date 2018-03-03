import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from '../social-auth';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile.routing.module';

import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignInViewComponent } from './components/sign-in-view/sign-in-view.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("25203938042-4lib64qraacmrchg84igmhvvnira3h2h.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1486674281419336")
  }
]);

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    SocialLoginModule.initialize(config),
  ],
  exports: [
    ProfileRoutingModule
  ],
  declarations: [SignInComponent, SignInViewComponent, SignInFormComponent]
})
export class ProfileModule { }

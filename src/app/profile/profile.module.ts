import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile.routing.module';

import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignInViewComponent } from './components/sign-in-view/sign-in-view.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  exports: [
    ProfileRoutingModule
  ],
  declarations: [SignInComponent, SignInViewComponent, SignInFormComponent]
})
export class ProfileModule { }

import { Component, OnInit } from '@angular/core';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from '../../../social-auth/';

import { LOGIN_MODES, SignInPayload } from '../../models/';

@Component({
  selector: 'rg-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AuthService]
})
export class SignInComponent implements OnInit {

  constructor(/*private authService: AuthService*/) { }

  private user: SocialUser;
  private loggedIn: boolean;

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  signIn(data: SignInPayload) {
    if (data.type === LOGIN_MODES.GOOGLE) {
      this.signInWithGoogle();
    }
    if (data.type === LOGIN_MODES.FACEBOOK) {
      this.signInWithFB();
    }
  }

  signInWithGoogle(): void {

    //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    //this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    //this.authService.signOut();
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core';

import { LOGIN_MODES, SignInPayload } from '../../models/';
import { EmailLoginAction, EmailRegisterAction } from '../../state';

@Component({
  selector: 'rg-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: []
})
export class SignInComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

  signIn(data: SignInPayload) {
    if (data.type === LOGIN_MODES.GOOGLE) {
      this.signInWithGoogle();
    }
    if (data.type === LOGIN_MODES.FACEBOOK) {
      this.signInWithFB();
    }
    if (data.type === LOGIN_MODES.EMAIL) {
      this.signInWithEmail(data);
    }
  }

  signInWithEmail(data: SignInPayload) {
    if (data.isLogin) {
      const action = new EmailLoginAction(data.payload);
      this.store.dispatch(action);
    } else {
      const action = new EmailRegisterAction(data.payload);
      this.store.dispatch(action);
    }
  }

  signInWithGoogle(): void {


  }

  signInWithFB(): void {

  }

  signOut(): void {

  }
}

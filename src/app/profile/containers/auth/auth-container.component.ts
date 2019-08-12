import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SignInPayload, LOGIN_MODES } from '../../models';
import { EmailLoginAction, EmailRegisterAction } from '../../state';
import { AppState, selectUser } from '@app/core';
import { AutoUnsubscribe } from '@app/shared';


@Component({
  selector: 'rg-auth-container',
  template: `<rg-auth-view (signIn)="signIn($event)"></rg-auth-view>`,
  styles: []
})
@AutoUnsubscribe()
export class AuthContainerComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  user$: Subscription;

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(selectUser),
      map(user => {
        if (user) {
          this.router.navigate(['']);
        }
      })
    ).subscribe();
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

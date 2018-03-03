import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LOGIN_MODES, LoginMode, SignInPayload } from '../../models';

@Component({
  selector: 'rg-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {

  @Input() isLogin: boolean;

  @Output() signIn: EventEmitter<SignInPayload> = new EventEmitter();

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get buttonText() {
    return this.isLogin ? 'Login' : 'Register';
  }

  form: FormGroup;
  buttons = LOGIN_MODES;

  onSignIn(mode: LoginMode) {
    this.signIn.emit({
      type: mode,
      isLogin: this.isLogin,
    });
  }

}

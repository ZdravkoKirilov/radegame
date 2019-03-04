import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators as vd } from '@angular/forms';

import { LOGIN_MODES, LoginMode, SignInPayload, AuthPayload } from '../../models';
import { emailValidator } from '@app/dynamic-forms';

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
			email: new FormControl('', vd.compose([vd.required, emailValidator])),
			alias: new FormControl('', vd.required),
			password: new FormControl('', vd.required),
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
			payload: <AuthPayload>{
				email: this.form.value.email,
				password: this.form.value.password,
				alias: this.form.value.alias,
			}
		});
	}

}

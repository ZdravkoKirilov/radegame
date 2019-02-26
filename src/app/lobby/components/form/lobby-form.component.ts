import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LobbyService } from '../../services/lobby.service';
import { createNameValidator } from './validators/lobby-name-available';
import { ToggleForm } from 'app/lobby/state';


@Component({
	selector: 'rg-lobby-form',
	templateUrl: './lobby-form.component.html',
	styleUrls: ['./lobby-form.component.scss']
})
export class LobbyFormComponent implements OnInit {

	@HostBinding('class.mat-elevation-z2') elevation = true;

	form: FormGroup;

	constructor(private store: Store<AppState>, private fb: FormBuilder, private api: LobbyService) {

		this.form = fb.group({
			name: ['', [Validators.required, Validators.min(3)], createNameValidator(api)],
			mode: ['public', Validators.required],
			password: ['']
		});

		this.form.valueChanges.subscribe(data => console.log(this.form));
	}

	ngOnInit() {
	}

	create() {
		this.store.dispatch(new ToggleForm(false));
	}

	cancel() {
		this.store.dispatch(new ToggleForm(false));
	}

	nameValid() {
		const control = this.form.controls['name'];
		return control.dirty && control.value.length >= 3 && control.valid;
	}

	nameInvalid() {
		const control = this.form.controls['name'];
		return control.dirty && control.value.length >= 3 && control.invalid;
	}

}

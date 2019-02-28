import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LobbyService } from '../../services/lobby.service';
import { createNameValidator } from './validators/lobby-name-available';
import { ToggleForm } from '../../state';
import { AutoUnsubscribe, OnChange } from '@app/shared';
import { Game } from '@app/game-mechanics';

type Inputs = {
	game: Game;
}

@Component({
	selector: 'rg-lobby-form',
	templateUrl: './lobby-form.component.html',
	styleUrls: ['./lobby-form.component.scss']
})
@AutoUnsubscribe()
export class LobbyFormComponent implements OnInit {

	@HostBinding('class.mat-elevation-z2') elevation = true;

	@OnChange<Inputs>(function (inputs) {
		this.cdk.detectChanges();
	})
	data: Inputs;

	form: FormGroup;

	constructor(
		private store: Store<AppState>,
		private fb: FormBuilder,
		private api: LobbyService,
		private cdk: ChangeDetectorRef
	) {
		this.form = this.fb.group({
			name: ['', [Validators.required, Validators.min(3)], createNameValidator(this.api)],
			setup: ['', Validators.required],
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

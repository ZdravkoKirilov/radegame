import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from '@app/core';
import { LobbyService } from '../../services/lobby.service';
import { createNameValidator } from './validators/lobby-name-available';
import { ToggleForm, getSelectedGame, CreateLobby } from '../../state';
import { AutoUnsubscribe } from '@app/shared';
import { Game } from '@app/game-mechanics';
import { selectUser, User } from '@app/profile';
import { Player, Lobby } from '../../models';

@Component({
	selector: 'rg-lobby-form',
	templateUrl: './lobby-form.component.html',
	styleUrls: ['./lobby-form.component.scss']
})
@AutoUnsubscribe()
export class LobbyFormComponent implements OnInit {

	@HostBinding('class.mat-elevation-z2') elevation = true;

	game$: Subscription;
	user$: Subscription;

	game: Game;
	user: User;
	form: FormGroup;

	constructor(
		private store: Store<AppState>,
		private fb: FormBuilder,
		private api: LobbyService,
	) {
		this.form = this.fb.group(
			{
				name: ['', [Validators.required, Validators.min(3)], createNameValidator(this.api)],
				setup: ['', Validators.required],
				mode: ['public', Validators.required],
				password: ['']
			}, {
				updateOn: 'blur'
			}
		);

		this.form.valueChanges.subscribe(data => console.log(this.form));
	}

	ngOnInit() {
		this.game$ = this.store.pipe(
			select(getSelectedGame),
			map(game => this.game = game),
		).subscribe();

		this.user$ = this.store.pipe(
			select(selectUser),
			map(user => this.user = user)
		).subscribe();
	}

	create() {

		const owner: Player = {
			name: `${this.game.title}:${this.form.value.name}:${this.user.alias}`,
			lobby: this.form.value.name,
			user: this.user.id,
			game: this.game.id,
		};

		const lobby: Lobby = {
			name: this.form.value.name,
			mode: this.form.value.mode,
			password: this.form.value.password,

			game: this.game.id,
			setup: this.form.value.setup,
			owner: this.user.id,
		};

		this.store.dispatch(new CreateLobby({ lobby, owner }));
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

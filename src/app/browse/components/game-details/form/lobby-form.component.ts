import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SelectSetup } from '../../../state';


@Component({
	selector: 'rg-lobby-form',
	templateUrl: './lobby-form.component.html',
	styleUrls: ['./lobby-form.component.scss']
})
export class LobbyFormComponent implements OnInit {

	@HostBinding('class.mat-elevation-z2') elevation = true;

	form: FormGroup;

	constructor(private store: Store<AppState>, private fb: FormBuilder) { 

		this.form = fb.group({
			name: ['', Validators.required],
			mode: ['public', Validators.required],
			password: ['']
		});

		this.form.valueChanges.subscribe(data => console.log(data));
	}

	ngOnInit() {
	}

	create() {
		this.store.dispatch(new SelectSetup(null));
	}

	cancel() {
		this.store.dispatch(new SelectSetup(null));
	}

}

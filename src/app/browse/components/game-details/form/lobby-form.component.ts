import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SelectSetup } from '../../../state';
import { BrowseService } from '../../../services/browse.service';
import { createNameValidator } from './validators/lobby-name-available';


@Component({
	selector: 'rg-lobby-form',
	templateUrl: './lobby-form.component.html',
	styleUrls: ['./lobby-form.component.scss']
})
export class LobbyFormComponent implements OnInit {

	@HostBinding('class.mat-elevation-z2') elevation = true;

	form: FormGroup;

	constructor(private store: Store<AppState>, private fb: FormBuilder, private api: BrowseService) { 

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
		this.store.dispatch(new SelectSetup(null));
	}

	cancel() {
		this.store.dispatch(new SelectSetup(null));
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
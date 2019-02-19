import { Component, OnInit, HostBinding } from '@angular/core';
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

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
	}

	cancel() {
		this.store.dispatch(new SelectSetup(null));
	}

}

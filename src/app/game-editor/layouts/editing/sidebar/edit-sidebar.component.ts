import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { Observable } from 'rxjs';
import { Game } from '@app/game-mechanics';
import { selectGame } from '../../../state';

@Component({
	selector: 'rg-edit-sidebar',
	templateUrl: './edit-sidebar.component.html',
	styleUrls: ['./edit-sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSidebarComponent implements OnInit {

	game$: Observable<Game>;

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.game$ = this.store.pipe(
			select(selectGame),
		);
	}

}

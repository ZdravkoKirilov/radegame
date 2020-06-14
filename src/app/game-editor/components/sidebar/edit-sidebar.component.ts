import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from '@app/game-mechanics';
import { AppState } from '@app/core';

import { selectGame } from '../../state';

@Component({
	selector: 'rg-edit-sidebar',
	templateUrl: './edit-sidebar.component.html',
	styleUrls: ['./edit-sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSidebarComponent implements OnInit {

	game$: Observable<Game>;
	game: Game;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.game$ = this.store.pipe(
			select(selectGame),
			map(game => this.game = game),
		);
	}

	composeLink(link: string) {
		return `/editor/games/${this.game?.id}/${link}`;
	}

}

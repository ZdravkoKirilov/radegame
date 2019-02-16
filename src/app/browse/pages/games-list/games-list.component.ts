import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@app/core';
import { FetchGames, getGames } from '../../state';
import { Game } from '@app/game-mechanics';

@Component({
	selector: 'rg-games-list-page',
	template: `
    <rg-browse-layout>
        <rg-games-list [games]="games$ | async">
        </rg-games-list>
    </rg-browse-layout>
`,
	styles: []
})
export class GamesListPage implements OnInit {

	games$: Observable<Game[]>;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new FetchGames());

		this.games$ = this.store.pipe(
			select(getGames),
		);
	}

}

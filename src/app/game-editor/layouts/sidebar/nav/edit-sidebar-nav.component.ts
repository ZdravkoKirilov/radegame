import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { selectGameId } from '@app/shared';


@Component({
	selector: 'rg-edit-sidebar-nav',
	templateUrl: './edit-sidebar-nav.component.html',
	styleUrls: ['./edit-sidebar-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSidebarNavComponent {
	gameId$: Subscription;

	gameId: number;

	constructor(private store: Store<AppState>) {
		this.gameId$ = this.store.pipe(select(selectGameId), map(gameId => this.gameId = gameId)).subscribe();
	}

	composeLink(link: string) {
		return `/editor/games/${this.gameId}/${link}`;
	}

}

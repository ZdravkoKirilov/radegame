import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { Subscription } from 'rxjs';
import { selectGameId } from '@app/shared';
import { map } from 'rxjs/operators';

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
		return `/games/${this.gameId}/editor/${link}`;
	}

}

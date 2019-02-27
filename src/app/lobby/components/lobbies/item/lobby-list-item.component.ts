import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Game, Setup } from '@app/game-mechanics';
import { Lobby } from '../../../models';
import { OnChange } from '@app/shared';

@Component({
	selector: 'rg-lobby-list-item',
	templateUrl: './lobby-list-item.component.html',
	styleUrls: ['./lobby-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyListItemComponent {

	setup: Setup;

	@Input() game: Game;

	@OnChange<Lobby>(function(lobby) {
		this.setup = this.game.setups.find(setup => setup.id === lobby.setup);
	})
	@Input() lobby: Lobby;
}

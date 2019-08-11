import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
	@Input() game: Game;

	@Input() lobby: Lobby;

	get setup(): Setup {
		return {} as any; //this.game.setups.find(setup => setup.id == this.lobby.setup);
	}
}

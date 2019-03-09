import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Lobby, Player } from '../../models';
import { Game, Team, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { User } from '@app/profile';

@Component({
	selector: 'rg-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameLobbyComponent {

	@Output() kickPlayer = new EventEmitter<Player>();
	@Output() updatePlayer = new EventEmitter<Partial<Player>>();

	@Input() data: {
		lobby: Lobby;
		game: Game;
		user: User;
		teams: Team[];
		factions: Faction[];
		images: ImageAsset[];
		setup: Setup;
		isOwner: boolean;
	}
	
	onPlayerUpdate(player: Player, data: Partial<Player>) {
		this.updatePlayer.emit({
			...player,
			...data
		});
	}

}

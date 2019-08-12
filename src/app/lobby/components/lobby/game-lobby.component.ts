import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Lobby, Player, ChatMessage } from '../../models';
import { Game, Team, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { User } from '@app/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'rg-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameLobbyComponent {

	@Output() kickPlayer = new EventEmitter<Player>();
	@Output() updatePlayer = new EventEmitter<Partial<Player>>();
	@Output() sendMessage = new EventEmitter<ChatMessage>();

	@Input() data: {
		lobby: Lobby;
		game: Game;
		user: User;
		teams: Team[];
		factions: Faction[];
		images: ImageAsset[];
		messages: ChatMessage[];
		setup: Setup;
		isOwner: boolean;
	}

	onPlayerUpdate(player: Player, data: Partial<Player>) {
		this.updatePlayer.emit({
			...player,
			...data
		});
	}

	get self() {
		if (this.data) {
			return this.data.lobby.players.find(player => player.user == this.data.user.id);
		}
	}

	onStatusChange(event: MatCheckboxChange) {
		const { checked } = event;
		this.updatePlayer.emit({
			...this.self,
			ready: checked
		});
	}

}

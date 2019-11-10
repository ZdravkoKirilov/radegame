import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Lobby, LobbyPlayer, ChatMessage } from '../../models';
import { Game, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { User } from '@app/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'rg-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameLobbyComponent {

	@Output() kickPlayer = new EventEmitter<LobbyPlayer>();
	@Output() updatePlayer = new EventEmitter<Partial<LobbyPlayer>>();
	@Output() sendMessage = new EventEmitter<ChatMessage>();
	@Output() startGame = new EventEmitter();

	@Input() data: {
		lobby: Lobby;
		game: Game;
		user: User;
		factions: Faction[];
		images: ImageAsset[];
		messages: ChatMessage[];
		setup: Setup;
		isOwner: boolean;
	}

	onPlayerUpdate(player: LobbyPlayer, data: Partial<LobbyPlayer>) {
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

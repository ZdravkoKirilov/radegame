import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Lobby } from '../../models';
import { Game, Team, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { User } from '@app/profile';

@Component({
	selector: 'rg-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameLobbyComponent {

	@Input() data: {
		lobby: Lobby;
		game: Game;
		user: User;
		teams: Team[];
		factions: Faction[];
		images: ImageAsset[];
		setup: Setup;
	}

}

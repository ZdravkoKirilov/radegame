import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Game } from '@app/game-mechanics';
import { Lobby } from '../../models';

@Component({
	selector: 'rg-game-lobbies',
	templateUrl: './game-lobbies.component.html',
	styleUrls: ['./game-lobbies.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLobbiesComponent {

	@Input() game: Game;

	@Input() lobbies: Lobby[];
	@Input() showForm: boolean;

	@Output() createLobby = new EventEmitter();

}

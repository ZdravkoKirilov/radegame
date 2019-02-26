import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Game } from '@app/game-mechanics';

@Component({
	selector: 'rg-game-lobbies',
	templateUrl: './game-lobbies.component.html',
	styleUrls: ['./game-lobbies.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLobbiesComponent {

	@Input() game: Game;

}

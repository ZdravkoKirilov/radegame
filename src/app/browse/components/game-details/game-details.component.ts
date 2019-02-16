import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Game } from '@app/game-mechanics';

@Component({
	selector: 'rg-game-details',
	templateUrl: './game-details.component.html',
	styleUrls: ['./game-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailsComponent {

	@Input() game: Game

}

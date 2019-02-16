import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Game } from '@app/game-mechanics';

@Component({
	selector: 'rg-games-list',
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {

	@Input() games: Game[];

}

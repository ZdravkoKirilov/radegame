import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Game, ImageAsset, Setup } from '@app/game-mechanics';
import { Dictionary } from '@app/shared';

@Component({
	selector: 'rg-game-details',
	templateUrl: './game-details.component.html',
	styleUrls: ['./game-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailsComponent {

	@Input() game: Game;
	@Input() setups: Setup;
	@Input() images: Dictionary<ImageAsset>;

}

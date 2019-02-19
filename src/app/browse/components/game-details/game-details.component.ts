import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
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
	@Input() images: Dictionary<ImageAsset>;
	@Input() showForm: boolean;

	@Output() createLobby = new EventEmitter<Setup>();

	_createLobby(setup: Setup) {
		this.createLobby.emit(setup);
	}

}

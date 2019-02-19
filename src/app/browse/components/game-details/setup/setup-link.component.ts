import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Setup, ImageAsset } from '@app/game-mechanics';
import { Dictionary } from '@app/shared';

@Component({
	selector: 'rg-setup-link',
	templateUrl: './setup-link.component.html',
	styleUrls: ['./setup-link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupLinkComponent {

	@Output() createGame = new EventEmitter();

	@Input() data: Setup;
	@Input() images: Dictionary<ImageAsset>;


}

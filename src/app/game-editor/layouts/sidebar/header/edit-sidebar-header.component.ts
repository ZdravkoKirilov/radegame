import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Game } from '@app/game-mechanics';

@Component({
	selector: 'rg-edit-sidebar-header',
	templateUrl: './edit-sidebar-header.component.html',
	styleUrls: ['./edit-sidebar-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSidebarHeaderComponent {

	@Input() game: Game;

}

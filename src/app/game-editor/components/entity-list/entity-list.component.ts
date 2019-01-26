import { Component, Input, TemplateRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { GameEntity } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';

@Component({
	selector: 'rg-entity-list',
	templateUrl: './entity-list.component.html',
	styleUrls: ['./entity-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent {

	@Input() template: TemplateRef<any>;
	@Input() items: GameEntity[];
	@Input() connectedEntities: ConnectedEntities;

	@Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
	@Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

	getImage(item: GameEntity) {
		const image = this.connectedEntities ? this.connectedEntities.images.find(elem => elem.id === item.id) : null;
		return image ? image.thumbnail || image.svg : null;
	}

}

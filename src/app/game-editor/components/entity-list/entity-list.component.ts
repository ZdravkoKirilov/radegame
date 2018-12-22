import { Component, Input, TemplateRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { GameEntity } from '@app/game-mechanics';

@Component({
  selector: 'rg-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent {

  @Input() template: TemplateRef<any>;
  @Input() items: GameEntity[];

  @Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

}

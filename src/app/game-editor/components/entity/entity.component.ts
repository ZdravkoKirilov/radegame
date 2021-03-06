import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { GameEntity } from '@app/game-mechanics';

@Component({
  selector: 'rg-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent {

  @Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

  @Input() data: GameEntity;
  @Input() image: string;

}

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GameEntity } from '../../../game-mechanics';

@Component({
  selector: 'rg-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent {

  @Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

  @Input() data: GameEntity;
  

}

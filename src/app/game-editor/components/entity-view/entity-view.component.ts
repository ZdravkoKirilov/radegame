import { Component } from '@angular/core';

import { GameEntity } from '../../../game-mechanics';
import { IndexBase } from '../../mixins';

@Component({
  selector: 'rg-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss']
})
export class EntityViewComponent extends IndexBase<GameEntity> {}

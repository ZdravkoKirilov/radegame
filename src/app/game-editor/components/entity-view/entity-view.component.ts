import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GameEntity } from '@app/game-mechanics';
import { IndexBase } from '../../mixins';

@Component({
  selector: 'rg-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityViewComponent extends IndexBase<GameEntity> {}

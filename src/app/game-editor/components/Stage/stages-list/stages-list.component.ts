import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ListBase } from '../../../mixins/list.base';
import { Stage } from '../../../../game-mechanics/models'

@Component({
  selector: 'rg-stages-list',
  templateUrl: './stages-list.component.html',
  styleUrls: ['./stages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StagesListComponent extends ListBase<Stage> {


}

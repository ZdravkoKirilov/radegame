import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IndexBase } from '../../../mixins/index.base';
import { Stage } from '../../../../game-mechanics/models';

@Component({
  selector: 'rg-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StagesComponent extends IndexBase<Stage> {
}

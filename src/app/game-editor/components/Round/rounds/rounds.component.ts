import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Round } from '../../../../game-mechanics/models/index';
import { IndexBase } from '../../../mixins/index.base';

@Component({
    selector: 'rg-rounds',
    templateUrl: './rounds.component.html',
    styleUrls: ['./rounds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundsComponent extends IndexBase<Round> {

}
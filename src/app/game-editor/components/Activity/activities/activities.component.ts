import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Activity } from '../../../../game-mechanics/models/index';
import { IndexBase } from '../../mixins/index.base';

@Component({
    selector: 'rg-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameActionsComponent extends IndexBase<Activity>{
}

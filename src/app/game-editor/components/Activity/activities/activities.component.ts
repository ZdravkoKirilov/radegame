import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Activity } from '../../../../game-mechanics';
import { IndexBase } from '../../../mixins';

@Component({
    selector: 'rg-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameActionsComponent extends IndexBase<Activity>{
}

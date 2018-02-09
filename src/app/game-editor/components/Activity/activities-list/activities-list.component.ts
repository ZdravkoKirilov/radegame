import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Activity } from '../../../../game-mechanics/models/index';
import { ListBase } from '../../../mixins/list.base';

@Component({
    selector: 'rg-activities-list',
    templateUrl: './activities-list.component.html',
    styleUrls: ['./activities-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameActionsListComponent extends ListBase<Activity> {

}

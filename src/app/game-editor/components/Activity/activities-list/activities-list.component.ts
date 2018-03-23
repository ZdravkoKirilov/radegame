import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Activity } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-activities-list',
    templateUrl: './activities-list.component.html',
    styleUrls: ['./activities-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameActionsListComponent extends ListBase<Activity> {

}

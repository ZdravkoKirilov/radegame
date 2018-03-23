import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Quest } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-quests-list',
    templateUrl: './quests-list.component.html',
    styleUrls: ['./quests-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestsListComponent extends ListBase<Quest> {

}

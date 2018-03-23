import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Quest } from '../../../../game-mechanics';
import { IndexBase } from '../../../mixins';

@Component({
    selector: 'rg-quests',
    templateUrl: './quests.component.html',
    styleUrls: ['./quests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestsComponent extends IndexBase<Quest> {

}

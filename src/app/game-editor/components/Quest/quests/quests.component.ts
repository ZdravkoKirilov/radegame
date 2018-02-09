import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Quest } from '../../../../game-mechanics/models/index';
import { IndexBase } from '../../../mixins/index.base';

@Component({
    selector: 'rg-quests',
    templateUrl: './quests.component.html',
    styleUrls: ['./quests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestsComponent extends IndexBase<Quest> {

}

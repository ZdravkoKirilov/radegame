import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Quest } from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-quests-list',
    templateUrl: './quests-list.component.html',
    styleUrls: ['./quests-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestsListComponent {

    @Input() items: Quest[];

    @Output() editItem: EventEmitter<Quest> = new EventEmitter();
    @Output() removeItem: EventEmitter<Quest> = new EventEmitter();

    constructor() {
    }

}

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Quest } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../../../dynamic-forms/models/ConnectedEntities';

@Component({
    selector: 'rg-quests',
    templateUrl: './quests.component.html',
    styleUrls: ['./quests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestsComponent {

    @Input() showEditor: boolean;
    @Input() selectedItem: Quest;
    @Input() items: Quest[];
    @Input() formDefinition: FormDefinition;
    @Input() connectedEntities: ConnectedEntities;

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editItem: EventEmitter<Quest> = new EventEmitter();
    @Output() saveItem: EventEmitter<Quest> = new EventEmitter();
    @Output() removeItem: EventEmitter<Quest> = new EventEmitter();

    constructor() {
    }

    showQuestEditor() {
        this.toggleEditor.emit(true);
    }

    hideQuestEditor() {
        this.toggleEditor.emit(false);
    }

}

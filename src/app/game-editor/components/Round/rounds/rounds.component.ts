import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Round } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../../../dynamic-forms/models/ConnectedEntities';

@Component({
    selector: 'rg-rounds',
    templateUrl: './rounds.component.html',
    styleUrls: ['./rounds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundsComponent {

    @Input() showEditor: boolean;
    @Input() selectedItem: Round;
    @Input() items: Round[];
    @Input() formDefinition: FormDefinition;
    @Input() connectedEntities: ConnectedEntities;

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editItem: EventEmitter<Round> = new EventEmitter();
    @Output() saveItem: EventEmitter<Round> = new EventEmitter();
    @Output() removeItem: EventEmitter<Round> = new EventEmitter();

    constructor() {
    }

    showRoundEditor() {
        this.toggleEditor.emit(true);
    }

    hideRoundEditor() {
        this.toggleEditor.emit(false);
    }

}

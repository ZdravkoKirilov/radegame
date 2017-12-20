import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Faction, Resource } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { copyText } from '../../../../shared/config/copy-text';

@Component({
    selector: 'rg-factions',
    templateUrl: './factions.component.html',
    styleUrls: ['./factions.component.scss']
})
export class FactionsComponent {

    constructor() {
    }

    @Input() factions: Faction[];
    @Input() selectedItem: Faction;
    @Input() showEditor: boolean;
    @Input() resources: Resource[];
    @Input() formDefinition: FormDefinition;

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editItem: EventEmitter<Faction> = new EventEmitter();
    @Output() saveItem: EventEmitter<Faction> = new EventEmitter();
    @Output() removeItem: EventEmitter<Faction> = new EventEmitter();

    public copy = copyText;

    showFactionEditor() {
        this.toggleEditor.emit(true);
    }

    hideFactionEditor() {
        this.toggleEditor.emit(false);
    }
}

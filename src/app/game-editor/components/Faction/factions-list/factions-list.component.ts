import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Faction } from '../../../../game-mechanics/models/Faction.model';

@Component({
    selector: 'rg-factions-list',
    templateUrl: './factions-list.component.html',
    styleUrls: ['./factions-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactionsListComponent {
    @Input() items: Faction[];

    @Output() editItem: EventEmitter<Faction> = new EventEmitter();
    @Output() removeItem: EventEmitter<Faction> = new EventEmitter();

    constructor() {
    }
}

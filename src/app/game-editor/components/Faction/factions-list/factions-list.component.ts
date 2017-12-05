import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Faction } from '../../../../game-mechanics/models/Faction';

@Component({
    selector: 'rg-factions-list',
    templateUrl: './factions-list.component.html',
    styleUrls: ['./factions-list.component.scss']
})
export class FactionsListComponent {
    @Input() items: Faction[];

    @Output() editItem: EventEmitter<Faction> = new EventEmitter();
    @Output() removeItem: EventEmitter<Faction> = new EventEmitter();

    constructor() {
    }
}

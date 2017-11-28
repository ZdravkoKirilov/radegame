import {Component, Input} from '@angular/core';

import { Faction } from '../../../../game-mechanics/models/Faction';

@Component({
    selector: 'rg-factions-list',
    templateUrl: './factions-list.component.html',
    styleUrls: ['./factions-list.component.scss']
})
export class FactionsListComponent {
    @Input() items: Faction[];
    constructor() {
    }
}

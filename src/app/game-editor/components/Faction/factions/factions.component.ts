import { Component, Input } from '@angular/core';

import { Faction } from '../../../../game-mechanics/models/Faction';
import { copyText } from '../../../../shared/config/copyText';

@Component({
    selector: 'rg-factions',
    templateUrl: './factions.component.html',
    styleUrls: ['./factions.component.scss']
})
export class FactionsComponent {

    constructor() {
    }

    @Input() factions: Faction[];
    public showEditor = false;
    public copy = copyText;

    showFactionEditor() {
        this.showEditor = true;
    }

    saveFaction() {
        this.showEditor = false;
    }

    hideFactionEditor() {
        this.showEditor = false;
    }
}

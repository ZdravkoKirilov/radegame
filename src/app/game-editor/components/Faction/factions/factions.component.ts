import { Component } from '@angular/core';

import { Faction } from '../../../../game-mechanics/models/index';
import { IndexBase } from '../../../mixins/index.base';

@Component({
    selector: 'rg-factions',
    templateUrl: './factions.component.html',
    styleUrls: ['./factions.component.scss']
})
export class FactionsComponent extends IndexBase<Faction> {
}

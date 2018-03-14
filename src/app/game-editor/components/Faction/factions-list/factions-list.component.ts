import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Faction } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-factions-list',
    templateUrl: './factions-list.component.html',
    styleUrls: ['./factions-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactionsListComponent extends ListBase<Faction> {
}

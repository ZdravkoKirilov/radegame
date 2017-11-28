import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Faction } from '../../../game-mechanics/models/Faction';
import { AppState } from '../../../core/state/index';
import { selectCharacters } from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-factions',
    templateUrl: './smart-factions.component.html',
    styleUrls: ['./smart-factions.component.scss']
})
export class SmartFactionsComponent implements OnInit {

    @Input() abilities: string[];
    public factions: Observable<Faction[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.factions = this.store.map(state => selectCharacters(state));
        });
    }
}

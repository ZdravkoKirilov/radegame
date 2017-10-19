import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Character} from '../../../game-mechanics/models/Character';
import {AppState} from '../../../state-store/index';
import {selectCharacters} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-characters',
    templateUrl: './smart-characters.component.html',
    styleUrls: ['./smart-characters.component.scss']
})
export class SmartCharactersComponent implements OnInit {

    @Input() abilities: string[];
    public characters: Observable<Character[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.characters = this.store.map(state => selectCharacters(state));
        });
    }
}

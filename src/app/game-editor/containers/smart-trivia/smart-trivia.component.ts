import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/state/index';
import {Observable} from 'rxjs/Observable';

import {Trivia} from '../../../game-mechanics/models/index';
import {selectTrivia} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-trivia',
    templateUrl: './smart-trivia.component.html',
    styleUrls: ['./smart-trivia.component.scss']
})
export class SmartTriviaComponent implements OnInit {
    public trivia: Observable<Trivia[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.trivia = this.store.map(state => selectTrivia(state));
    }

}

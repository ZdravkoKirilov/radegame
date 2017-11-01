import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../../core/state/index';
import {selectBoardType} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss']
})
export class SmartFieldsComponent implements OnInit {

    boardType: Observable<string>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.boardType = this.store.map(state => selectBoardType(state));
    }

}

import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../../state-store/index';
import {Grid} from '../../../game-mechanics/models/BoardField';
import {selectFieldsGrid} from '../../state/reducers/selectors';
import {
    AddGridRowAction,
    AddGridColumnAction,
    RemoveGridRowAction,
    RemoveGridColumnAction
} from '../../state/actions/byFeature/fieldActions';

@Component({
    selector: 'rg-smart-grid-editor',
    templateUrl: './smart-grid-editor.component.html',
    styleUrls: ['./smart-grid-editor.component.scss']
})
export class SmartGridEditorComponent implements OnInit {
    grid: Observable<Grid>;

    constructor(private store: Store<AppState>) {
    }

    addGridRow() {
        this.store.dispatch(new AddGridRowAction());
    }

    addGridColumn() {
        this.store.dispatch(new AddGridColumnAction());
    }

    removeGridRow(index: number) {
        this.store.dispatch(new RemoveGridRowAction(index));
    }

    removeGridColumn(index: number) {
        this.store.dispatch(new RemoveGridColumnAction(index));
    }

    ngOnInit() {
        this.grid = this.store.map((state: AppState) => selectFieldsGrid(state));
    }
}

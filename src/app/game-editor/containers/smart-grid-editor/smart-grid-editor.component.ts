import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../core/state/index';
import { Grid } from '../../../game-mechanics/models/index';
import { FieldCoord } from '../../models/index';
import { selectGridWithInnerItems } from '../../state/reducers/selectors';
import {
    AddGridRowAction,
    AddGridColumnAction,
    RemoveGridRowAction,
    RemoveGridColumnAction,
    RemoveGridFieldAction
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

    handleFieldRemove(coords: FieldCoord) {
        this.store.dispatch(new RemoveGridFieldAction(coords));
    }

    ngOnInit() {
        this.grid = this.store.map((state: AppState) => selectGridWithInnerItems(state));
    }
}

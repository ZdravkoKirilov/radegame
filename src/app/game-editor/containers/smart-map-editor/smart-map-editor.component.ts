import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../../core/state/index';
import {UpdateMapAction} from '../../state/actions/byFeature/mapActions';
import {Map} from '../../models/index';
import { BoardField } from '../../../game-mechanics/models/index';
import {selectCanvasImage, selectFieldsAsArray} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-map-editor',
    templateUrl: './smart-map-editor.component.html',
    styleUrls: ['./smart-map-editor.component.scss']
})
export class SmartMapEditorComponent implements OnInit {
    canvasImage: Observable<string>;
    fields: Observable<BoardField[]>;

    constructor(private store: Store<AppState>) {
    }

    addBackground(image) {
        if (image) {
            const payload: Map = {
                canvas: {
                    image
                }
            };
            this.store.dispatch(new UpdateMapAction(payload));
        }
    }

    removeBackground() {
        const payload: Map = {
            canvas: {
                image: null
            }
        };
        this.store.dispatch(new UpdateMapAction(payload));
    }

    ngOnInit() {
        this.canvasImage = this.store.map(state => selectCanvasImage(state));
        this.fields = this.store.map(state => selectFieldsAsArray(state));
    }
}

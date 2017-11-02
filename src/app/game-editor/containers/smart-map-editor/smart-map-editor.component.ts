import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../../core/state/index';
import {UpdateMapAction, SaveMapFieldAction} from '../../state/actions/byFeature/mapActions';
import {DeleteFieldAction} from '../../state/actions/byFeature/fieldActions';
import {Map} from '../../models/index';
import {BoardField, MapFieldSettings} from '../../../game-mechanics/models/index';
import {selectCanvasImage, selectFieldsAsArray, selectCanvasItems} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-map-editor',
    templateUrl: './smart-map-editor.component.html',
    styleUrls: ['./smart-map-editor.component.scss']
})
export class SmartMapEditorComponent implements OnInit {
    canvasImage: Observable<string>;
    fields: Observable<BoardField[]>;
    canvasItems: Observable<{ [key: string]: MapFieldSettings }>;

    constructor(private store: Store<AppState>) {
    }

    saveMapField(payload: MapFieldSettings) {
        this.store.dispatch(new SaveMapFieldAction(payload));
    }

    deleteField(payload: BoardField) {
        this.store.dispatch(new DeleteFieldAction(payload));
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
        this.canvasItems = this.store.map(state => selectCanvasItems(state));
    }
}

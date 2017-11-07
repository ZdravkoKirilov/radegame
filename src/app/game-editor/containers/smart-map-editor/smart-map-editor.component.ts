import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../../core/state/index';
import {
    UpdateMapAction,
    SaveMapFieldAction,
    DeleteMapFieldAction,
    SaveMapPathAction,
    TogglePathCreationModeAction
} from '../../state/actions/byFeature/mapActions';
import {DeleteFieldAction, ToggleFieldEditorAction, ChangeSelectedFieldAction} from '../../state/actions/byFeature/fieldActions';
import {Map} from '../../models/index';
import {BoardField, MapFieldSettings, MapPath} from '../../../game-mechanics/models/index';
import {
    selectCanvasImage,
    selectFieldsAsArray,
    selectCanvasItems,
    selectFieldEditorToggleState,
    getSelectedField,
    selectPathCreationMode
} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-map-editor',
    templateUrl: './smart-map-editor.component.html',
    styleUrls: ['./smart-map-editor.component.scss']
})
export class SmartMapEditorComponent implements OnInit {
    canvasImage: Observable<string>;
    fields: Observable<BoardField[]>;
    canvasItems: Observable<{ [key: string]: MapFieldSettings }>;
    showFieldEditor: Observable<boolean>;
    selectedField: Observable<BoardField>;
    pathCreationMode: Observable<boolean>;

    constructor(private store: Store<AppState>) {
    }

    toggleFieldEditor(value: boolean) {
        this.store.dispatch(new ToggleFieldEditorAction(value));
    }

    togglePathCreationMode(value) {
        this.store.dispatch(new ChangeSelectedFieldAction(null));
        this.store.dispatch(new TogglePathCreationModeAction(value));
    }

    createPath(elems: number[]) {
        const from = elems[0];
        const to = elems[1];
        if (from && to) {
            const payload: MapPath = {from, to};
            this.store.dispatch(new SaveMapPathAction(payload));
        }
    }

    selectField(id?: number) {
        this.store.dispatch(new ChangeSelectedFieldAction(id));
    }

    saveMapField(payload: MapFieldSettings) {
        this.store.dispatch(new SaveMapFieldAction(payload));
    }

    deleteField(payload: {
        field: BoardField,
        mapField: MapFieldSettings
    }) {
        this.store.dispatch(new DeleteFieldAction(payload.field));
        this.store.dispatch(new DeleteMapFieldAction(payload.mapField));
    }

    addBackground(image) {
        if (image) {
            const payload: Map = {canvas: {image}};
            this.store.dispatch(new UpdateMapAction(payload));
        }
    }

    removeBackground() {
        const payload: Map = {canvas: {image: null}};
        this.store.dispatch(new UpdateMapAction(payload));
    }

    ngOnInit() {
        this.canvasImage = this.store.map(state => selectCanvasImage(state));
        this.fields = this.store.map(state => selectFieldsAsArray(state));
        this.canvasItems = this.store.map(state => selectCanvasItems(state));
        this.showFieldEditor = this.store.map(state => selectFieldEditorToggleState(state));
        this.selectedField = this.store.map(state => getSelectedField(state));
        this.pathCreationMode = this.store.map(state => selectPathCreationMode(state));
    }
}

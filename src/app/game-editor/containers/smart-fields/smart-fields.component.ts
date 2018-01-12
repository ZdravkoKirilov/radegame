import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import {
    GameMap,
    BoardField,
    BoardFieldList,
    Game,
    MapPath,
    MapLocationList,
    MapLocation,
    Resource
} from '../../../game-mechanics/models/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { FIELD_DEF } from '../../forms/field.form';

import {
    selectFieldEditorToggleState, getSelectedField, selectFieldsAsArray,
    selectFields
} from '../../state/reducers/byFeature/fields.reducer';
import {
    getSelectedPath,
    selectMapLocations,
    selectMapPaths,
    selectMap,
    selectPathCreationMode
} from '../../state/reducers/byFeature/map.reducer';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';

import { SaveMapLocationAction, SetPathCreationAction, ChangeSelectedPathAction } from '../../state/actions/byFeature/map.action';
import { ChangeSelectedFieldAction, ToggleFieldEditorAction, SaveFieldAction } from '../../state/actions/byFeature/field.action';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss']
})
export class SmartFieldsComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    formDefinition: FormDefinition = FIELD_DEF;

    showFieldEditor: boolean;
    pathCreationMode: boolean;

    selectedField: BoardField;
    selectedPath: MapPath;

    fields: BoardField[];
    fieldsList: BoardFieldList;
    paths: MapPath[];
    locations: MapLocationList;
    map: GameMap;

    game: Game;

    resources: Resource[];

    constructor(private store: Store<AppState>) {
    }

    editField() {
        this.toggleFieldEditor(true);
    }

    saveField(data: BoardField) {
        const payload = {...data, game: this.game.id};
        if (this.selectedField) {
            payload.id = this.selectedField.id;
        }
        this.store.dispatch(new SaveFieldAction(payload));
        this.toggleFieldEditor(false);
    }

    removeField(payload: BoardField) {

    }

    selectField(id: number) {
        const field = this.fieldsList[id] || null;
        this.store.dispatch(new ChangeSelectedFieldAction(field));
    }

    toggleFieldEditor(flag: boolean) {
        this.store.dispatch(new ToggleFieldEditorAction(flag));
    }

    savePath(payload: MapPath) {

    }

    removePath(payload: MapPath) {

    }

    selectPath(payload: MapPath) {
        this.store.dispatch(new ChangeSelectedPathAction(payload));
    }

    saveMapLocation(payload: MapLocation) {
        this.store.dispatch(new SaveMapLocationAction(payload));
    }

    setPathCreation(flag: boolean) {
        this.store.dispatch(new SetPathCreationAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store
            .subscribe(state => {
                this.showFieldEditor = selectFieldEditorToggleState(state);
                this.selectedField = getSelectedField(state);
                this.selectedPath = getSelectedPath(state);
                this.fields = selectFieldsAsArray(state);
                this.fieldsList = selectFields(state);
                this.paths = selectMapPaths(state);
                this.locations = selectMapLocations(state);
                this.game = selectGame(state);
                this.map = selectMap(state);
                this.resources = selectResources(state);
                this.pathCreationMode = selectPathCreationMode(state);
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

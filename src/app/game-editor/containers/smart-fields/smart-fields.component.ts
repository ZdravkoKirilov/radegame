import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState, selectStageId } from '@app/core';
import {
    Field, FieldList, Game, MapPath, MapLocationList, MapLocation,
    Stage, SceneRenderService
} from '@app/game-mechanics';
import { getSelectedItem, getItems, getItemById, getItemsList, getEditorState, getEntities } from '../../state/reducers/generics';
import { formKeys, ToggleEditorAction, ChangeSelectedItemAction, SaveItemAction, DeleteItemAction } from '../../state/actions/generics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { FIELD_DEF } from '../../forms';
import { toIndexedList } from '@app/shared';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss'],
    viewProviders: [SceneRenderService]
})
export class SmartFieldsComponent implements OnInit, OnDestroy {

    private storeSubs: Subscription[];
    private fKey = formKeys.FIELDS;
    private lKey = formKeys.LOCATIONS;
    private pKey = formKeys.PATHS;
    private sKey = formKeys.STAGES;

    formDefinition: FormDefinition = FIELD_DEF;

    showFieldEditor: boolean;
    pathCreationMode: boolean;

    selectedField?: Field;
    selectedPath: MapPath;

    fields: Field[];
    fieldsList: FieldList;
    paths: MapPath[];
    locations: MapLocationList;

    game: Game;
    stage: Stage;
    stageId: number;

    connectedEntities: ConnectedEntities;

    asList: boolean = false;

    constructor(private store: Store<AppState>) {
    }

    editField(data: Field) {
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.fKey, data }));
        this.toggleFieldEditor(true);
    }

    saveField(data: Field) {
        const payload = { ...data, game: this.game.id, stage: this.stage.id };
        if (this.selectedField) {
            payload.id = this.selectedField.id;
        }
        this.store.dispatch(new SaveItemAction({ key: this.fKey, data }));
        this.toggleFieldEditor(false);
    }

    removeField(data: Field) {
        this.store.dispatch(new DeleteItemAction({ key: this.fKey, data }));
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.fKey, data: null }));
    }

    selectField(id: number) {
        const field = this.fieldsList[id] || null;
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.pKey, data: null }));
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.fKey, data: field }));
    }

    toggleFieldEditor(flag: boolean) {
        if (flag === false) {
            this.store.dispatch(new ChangeSelectedItemAction({ key: this.fKey, data: null }));
        }
        this.store.dispatch(new ToggleEditorAction({ key: this.fKey, data: flag }));
    }

    toggleListView(value: boolean) {
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.fKey, data: null }));
        this.asList = value;
    }

    savePath(payload: MapPath) {
        const path = { ...payload, game: this.game.id, stage: this.stage.id };
        this.store.dispatch(new SaveItemAction({ key: this.pKey, data: path }));
    }

    removePath(payload: MapPath) {
        this.store.dispatch(new DeleteItemAction({ key: this.pKey, data: payload }));
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.pKey, data: null }));
    }

    selectPath(payload: MapPath) {
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.fKey, data: null }));
        this.store.dispatch(new ChangeSelectedItemAction({ key: this.pKey, data: payload }));
    }

    saveMapLocation(payload: MapLocation) {
        this.store.dispatch(new SaveItemAction({ key: this.lKey, data: payload }));
    }

    setPathCreation(flag: boolean) {
        this.pathCreationMode = flag;
    }

    updateStage(image: any) {
        image = image || null;
        const stage = { id: this.stageId, image, game: this.game.id };
        this.store.dispatch(new SaveItemAction({ key: this.sKey, data: stage }));
    }

    ngOnInit() {
        this.storeSubs = [
            this.store
                .subscribe(state => {
                    this.game = <Game>getSelectedItem(formKeys.GAMES)(state.editor.metadata);
                    this.stageId = selectStageId(state);
                    this.stage = <Stage>getItemById(this.sKey, this.stageId)(state.editor.form);
                    this.selectedField = <Field>getSelectedItem(this.fKey)(state.editor.form);
                    this.showFieldEditor = getEditorState(this.fKey)(state.editor.form);
                    this.connectedEntities = getEntities(state.editor.form);
                    this.fields = <Field[]>getItems(this.fKey, this.game.id)(state.editor.form).filter((elem: Field) => elem.stage === this.stageId);
                    this.fieldsList = <FieldList>getItemsList(this.fKey)(state.editor.form);
                    this.paths = <MapPath[]>getItems(this.pKey, this.game.id)(state.editor.form).filter((elem: MapPath) => elem.stage === this.stageId);
                    this.selectedPath = <MapPath>getSelectedItem(this.pKey)(state.editor.form);
                    this.locations = toIndexedList(getItems(this.lKey, this.game.id)(state.editor.form).filter((elem: MapLocation) => elem.stage === this.stageId), 'field');
                }),
        ];
    }

    ngOnDestroy() {
        this.storeSubs.forEach(elem => elem.unsubscribe());
    }
}

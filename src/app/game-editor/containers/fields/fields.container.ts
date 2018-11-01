import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription ,  Observable ,  combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState, selectGameId, selectStageId } from '@app/core';
import {
    Field, Game, PathEntity, LocationEntityList, LocationEntity,
    Stage, SceneRenderService
} from '@app/game-mechanics';
import { getItems, getEntities } from '../../state';
import { SaveItemAction, DeleteItemAction } from '../../state';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { FIELD_DEF } from '../../forms';
import { formKeys } from 'app/game-editor/state';

@Component({
    selector: 'rg-fields-container',
    templateUrl: './fields.container.html',
    styleUrls: ['./fields.container.scss'],
    viewProviders: [SceneRenderService]
})
export class FieldsContainerComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    private fKey = formKeys.FIELDS;
    private lKey = formKeys.LOCATIONS;
    private pKey = formKeys.PATHS;
    private sKey = formKeys.STAGES;

    formDefinition: FormDefinition = FIELD_DEF;

    showFieldEditor: boolean;
    pathCreationMode: boolean;

    selectedField: Field;
    selectedPath: PathEntity;

    fields$: Observable<Field[]>;
    paths$: Observable<PathEntity[]>;
    locations$: Observable<LocationEntityList>;

    connectedEntities$: Observable<ConnectedEntities>;

    gameId: Game;
    stage: Stage;
    stageId: number;

    asList: boolean = false;

    constructor(private store: Store<AppState>) {
    }

    editField(field: Field) {
        this.selectedField = field;
        this.toggleFieldEditor(true);
    }

    saveField(field: Field) {
        const payload = { ...field, game: this.gameId, stage: this.stage.id };
        if (this.selectedField) {
            payload.id = this.selectedField.id;
        }
        this.store.dispatch(new SaveItemAction({ key: this.fKey, data: field }));
        this.toggleFieldEditor(false);
    }

    removeField(field: Field) {
        this.store.dispatch(new DeleteItemAction({ key: this.fKey, data: field }));
        this.selectedField = null;
    }

    selectField(field: Field) {
        this.selectedPath = null;
        this.selectedField = field;
    }

    toggleFieldEditor(isVisible: boolean) {
        if (isVisible === false) {
            this.selectedField = null;
        }
        this.showFieldEditor = isVisible;
    }

    toggleListView(showAsList: boolean) {
        this.selectedField = null;
        this.asList = showAsList;
    }

    savePath(path: PathEntity) {
        const pathPayload = { ...path, game: this.gameId, stage: this.stageId };
        this.store.dispatch(new SaveItemAction({ key: this.pKey, data: pathPayload }));
    }

    removePath(path: PathEntity) {
        this.store.dispatch(new DeleteItemAction({ key: this.pKey, data: path }));
        this.selectedPath = null;
    }

    selectPath(path: PathEntity) {
        this.selectedField = null;
        this.selectedPath = path;
    }

    saveMapLocation(payload: LocationEntity) {
        this.store.dispatch(new SaveItemAction({ key: this.lKey, data: payload }));
    }

    setPathCreation(pathCreationActive: boolean) {
        this.pathCreationMode = pathCreationActive;
    }

    updateStage(image: any) {
        image = image || null;
        const stage = { id: this.stageId, image, game: this.gameId };
        this.store.dispatch(new SaveItemAction({ key: this.sKey, data: stage }));
    }

    ngOnInit() {

        this.sub = combineLatest(
            this.store.pipe(select(selectGameId)),
            this.store.pipe(select(selectStageId)),
        ).pipe(
            tap(([gameId, stageId]) => {
                this.stageId = stageId;
                this.gameId = gameId;
            })
        ).subscribe();

        this.connectedEntities$ = this.store.pipe(select(getEntities));
        this.fields$ = this.store.pipe(select(getItems(this.fKey)));
        this.paths$ = this.store.pipe(select(getItems(this.pKey)));
        this.locations$ = this.store.pipe(select(getItems(this.lKey)));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

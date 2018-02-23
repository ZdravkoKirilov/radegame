import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import {
    GameMap,
    Field,
    FieldList,
    Game,
    MapPath,
    MapLocationList,
    MapLocation,
    Resource,
    Stage
} from '../../../game-mechanics/models/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { FIELD_DEF } from '../../forms/Field/field.form';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { SceneRenderService } from '../../../game-mechanics/rendering/scene-render.service';
import { SaveStageAction } from '../../state/actions';

import {
    selectFieldEditorToggleState, getSelectedField,
    selectFields, selectFieldsByStageId,
} from '../../state/reducers/byFeature/fields.reducer';
import { selectQuests } from '../../state/reducers/byFeature/quest.reducer';
import { selectActivities } from '../../state/reducers/byFeature/activity.reducer';
import {
    getSelectedPath,
    selectMapLocations,
    selectMapPaths,
    selectPathCreationMode,
    selectPathsByStageId,
    selectLocationsByStageId,
} from '../../state/reducers/byFeature/map.reducer';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';
import { selectStageId } from '../../../core/state/reducers/selectors';
import { selectStageById } from '../../state/reducers/exports';

import {
    SaveMapLocationAction,
    SetPathCreationAction,
    ChangeSelectedPathAction,
    SaveMapPathAction,
    DeleteMapPathAction
} from '../../state/actions/byFeature/map.action';
import {
    ChangeSelectedFieldAction,
    ToggleFieldEditorAction,
    UpdateFieldAction,
    SaveFieldAction,
    DeleteFieldAction
} from '../../state/actions/byFeature/field.action';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss'],
    providers: [SceneRenderService]
})
export class SmartFieldsComponent implements OnInit, OnDestroy {

    private storeSubs: Subscription[];
    formDefinition: FormDefinition = FIELD_DEF;

    showFieldEditor: boolean;
    pathCreationMode: boolean;

    selectedField: Field;
    selectedPath: MapPath;

    fields: Field[];
    fieldsList: FieldList;
    paths: MapPath[];
    locations: MapLocationList;

    game: Game;
    stage: Stage;
    stageId: number;

    connectedEntities: ConnectedEntities;

    constructor(private store: Store<AppState>) {
    }

    editField() {
        this.toggleFieldEditor(true);
    }

    saveField(data: Field) {
        const payload = { ...data, game: this.game.id, stage: this.stage.id };
        if (this.selectedField) {
            payload.id = this.selectedField.id;
        }
        payload.id ? this.store.dispatch(new UpdateFieldAction(payload)) : this.store.dispatch(new SaveFieldAction(payload));
        this.toggleFieldEditor(false);
    }

    removeField(payload: Field) {
        this.store.dispatch(new DeleteFieldAction(payload));
    }

    selectField(id: number) {
        const field = this.fieldsList[id] || null;
        this.store.dispatch(new ChangeSelectedFieldAction(field));
    }

    toggleFieldEditor(flag: boolean) {
        this.store.dispatch(new ToggleFieldEditorAction(flag));
    }

    savePath(payload: MapPath) {
        const path = { ...payload, game: this.game.id, stage: this.stage.id };
        this.store.dispatch(new SaveMapPathAction(path));
    }

    removePath(payload: MapPath) {
        this.store.dispatch(new DeleteMapPathAction(payload));
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

    updateStage(image: any) {
        image = image || null;
        this.store.dispatch(new SaveStageAction({ id: this.stageId, image, game: this.game.id }));
    }

    ngOnInit() {
        this.storeSubs = [
            this.store
                .subscribe(state => {
                    this.showFieldEditor = selectFieldEditorToggleState(state);
                    this.selectedField = getSelectedField(state);
                    this.selectedPath = getSelectedPath(state);
                    this.fieldsList = selectFields(state);
                    this.game = selectGame(state);
                    this.stageId = selectStageId(state);
                    this.fields = selectFieldsByStageId(this.stageId)(state);
                    this.stage = selectStageById(this.stageId)(state);
                    this.paths = selectPathsByStageId(this.stageId)(state);
                    this.locations = selectLocationsByStageId(this.stageId)(state);
                    this.pathCreationMode = selectPathCreationMode(state);
                    this.connectedEntities = {
                        resources: selectResources(state),
                        activities: selectActivities(state),
                        quests: selectQuests(state),
                    };
                }),
        ];
        this.store.dispatch(new ChangeSelectedFieldAction(null));
    }

    ngOnDestroy() {
        this.storeSubs.forEach(elem => elem.unsubscribe());
    }
}

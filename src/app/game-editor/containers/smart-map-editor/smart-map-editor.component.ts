import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from '../../../core/state/index';
import {
    SaveMapLocationAction,
    SaveMapPathAction,
    SetPathCreationAction,
    ChangeSelectedPathAction,
    DeleteMapPathAction,
    SaveMapAction
} from '../../state/actions/byFeature/map.action';
import {
    DeleteFieldAction,
    ToggleFieldEditorAction, ChangeSelectedFieldAction
} from '../../state/actions/byFeature/field.action';
import {BoardField, MapLocation, MapPath, GameMap, Game} from '../../../game-mechanics/models/index';
import {
    selectGame} from '../../state/reducers/byFeature/assets.reducer';
import {
    getSelectedField, selectFieldEditorToggleState, selectFieldsAsArray,
    selectLastInsertedField
} from '../../state/reducers/byFeature/fields.reducer';
import {
    getSelectedPath, selectCanvasImage, selectMap, selectMapLocations, selectMapPaths,
    selectPathCreationMode
} from '../../state/reducers/byFeature/map.reducer';

@Component({
    selector: 'rg-smart-map-editor',
    templateUrl: './smart-map-editor.component.html',
    styleUrls: ['./smart-map-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartMapEditorComponent {
    // canvasImage: Observable<string>;
    // fields: Observable<BoardField[]>;
    // mapLocations: Observable<{ [key: string]: MapLocation }>;
    // mapPaths: Observable<MapPath[]>;
    // showFieldEditor: Observable<boolean>;
    // selectedField: Observable<BoardField>;
    // selectedPath: Observable<MapPath>;
    // pathCreationMode: Observable<boolean>;
    // lastInsertedField: Observable<number>;
    // storeSub: Subscription;
    // game: Game;
    // map: GameMap;
    //
    // constructor(private store: Store<AppState>) {
    // }
    //
    // toggleFieldEditor(value: boolean) {
    //     this.store.dispatch(new ToggleFieldEditorAction(value));
    // }
    //
    // togglePathCreationMode(value: boolean) {
    //     this.store.dispatch(new ChangeSelectedFieldAction(null));
    //     this.store.dispatch(new SetPathCreationAction(value));
    // }
    //
    // createPath(payload: MapPath) {
    //     payload.game = this.game.id;
    //     this.store.dispatch(new SaveMapPathAction(payload));
    // }
    //
    // selectField(id?: number) {
    //     this.store.dispatch(new ChangeSelectedPathAction(null));
    //     this.store.dispatch(new ChangeSelectedFieldAction(id));
    // }
    //
    // selectPath(id?: number) {
    //     this.store.dispatch(new ChangeSelectedFieldAction(null));
    //     this.store.dispatch(new ChangeSelectedPathAction(id));
    // }
    //
    // deletePath(payload: MapPath) {
    //     if (payload) {
    //         this.store.dispatch(new DeleteMapPathAction(payload));
    //     }
    // }
    //
    // saveMapLocation(payload: MapLocation) {
    //     this.store.dispatch(new SaveMapLocationAction(payload));
    // }
    //
    // editField() {
    //     this.toggleFieldEditor(true);
    // }
    //
    // deleteField(payload: BoardField) {
    //     if (payload) {
    //         this.store.dispatch(new DeleteFieldAction(payload));
    //     }
    // }
    //
    // addBackground(image) {
    //     if (image) {
    //         const payload: GameMap = {...this.map, image};
    //         this.store.dispatch(new SaveMapAction(payload));
    //     }
    // }
    //
    // removeBackground() {
    //     const payload: GameMap = {...this.map, image: ''};
    //     this.store.dispatch(new SaveMapAction(payload));
    // }
    //
    // ngOnInit() {
    //     this.canvasImage = this.store.map(state => selectCanvasImage(state));
    //     this.fields = this.store.map(state => selectFieldsAsArray(state));
    //     this.mapLocations = this.store.map(state => selectMapLocations(state));
    //     this.mapPaths = this.store.map(state => selectMapPaths(state));
    //     this.showFieldEditor = this.store.map(state => selectFieldEditorToggleState(state));
    //     this.selectedField = this.store.map(state => getSelectedField(state));
    //     this.selectedPath = this.store.map(state => getSelectedPath(state));
    //     this.pathCreationMode = this.store.map(state => selectPathCreationMode(state));
    //     this.lastInsertedField = this.store.map(state => selectLastInsertedField(state));
    //
    //     this.storeSub = this.store.subscribe(state => {
    //         this.game = selectGame(state);
    //         this.map = selectMap(state);
    //     });
    // }
    //
    // ngOnDestroy() {
    //     this.storeSub.unsubscribe();
    // }
}

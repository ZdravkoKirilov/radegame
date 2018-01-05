import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Map, MapLocation, MapPath } from '../../../../game-mechanics/models/index';

import {
    DeleteMapLocationSuccessAction,
    DeleteMapPathFailAction,
    DeleteMapPathSuccessAction,
    GetMapFailAction, GetMapLocationsAction, GetMapLocationsSuccessAction,
    GetMapPathsAction, GetMapPathsFailAction, GetMapPathsSuccessAction,
    GetMapSuccessAction,
    MapAction,
    SaveMapFailAction,
    SaveMapLocationFailAction,
    SaveMapLocationSuccessAction,
    SaveMapPathFailAction,
    SaveMapPathSuccessAction,
    SaveMapSuccessAction, SetMapLocationsAction, SetMapPathsAction
} from '../../actions/byFeature/map.action';

import { OperationFailAction, OperationSuccessAction } from '../../../../core/state/actions/actions';
import { systemMessages as sm } from '../../../../shared/config/messages';
import {
    DELETE_MAP_PATH, GET_MAP, GET_MAP_LOCATIONS, GET_MAP_PATHS, SAVE_MAP, SAVE_MAP_LOCATION,
    SAVE_MAP_PATH
} from '../../reducers/byFeature/map.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class MapEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() saveMap: Observable<any> = this.actions$
        .ofType(SAVE_MAP)
        .map((action: MapAction) => action.payload)
        .mergeMap((payload: Map) => {
            return this.api.saveMap(payload);
        })
        .mergeMap((res: Map) => {
            return [new SaveMapSuccessAction(res)];
        })
        .catch(() => {
            return of(new SaveMapFailAction());
        });

    @Effect() getMap: Observable<any> = this.actions$
        .ofType(GET_MAP)
        .mergeMap((action: MapAction) => {
            return this.api.getMaps(action.payload);
        })
        .map(([map]: Map[]) => {
            return new GetMapSuccessAction(map);
        })
        .catch(() => {
            return of(new GetMapFailAction());
        });

    @Effect() saveMapPath: Observable<any> = this.actions$
        .ofType(SAVE_MAP_PATH)
        .map((action: MapAction) => action.payload)
        .map(payload => {
            return payload;
        })
        .mergeMap(payload => {
            return this.api.saveMapPath(payload);
        })
        .mergeMap((res: MapPath) => {
            return [new SaveMapPathSuccessAction(res), new OperationSuccessAction(sm.SAVE_MAP_PATH_SUCCESS)];
        })
        .catch(() => {
            return [new SaveMapPathFailAction(), new OperationFailAction(sm.SAVE_MAP_PATH_FAIL)];
        });

    @Effect() deleteMapPath: Observable<any> = this.actions$
        .ofType(DELETE_MAP_PATH)
        .map((action: MapAction) => action.payload)
        .map((payload) => {
            this.store.dispatch(new DeleteMapPathSuccessAction(payload));
            return payload;
        })
        .mergeMap((payload: MapPath) => {
            return this.api.deleteMapPath(payload)
                .mergeMap(() => {
                    return [
                        new DeleteMapPathSuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_MAP_PATH_SUCCESS)
                    ];
                })
                .catch(() => {
                    return [
                        new SaveMapPathSuccessAction(payload),
                        new DeleteMapPathFailAction(),
                        new OperationFailAction(sm.DELETE_MAP_PATH_FAIL)
                    ];
                });
        });

    @Effect() getMapPaths: Observable<any> = this.actions$
        .ofType(GET_MAP_PATHS)
        .map((action: GetMapPathsAction) => action.payload)
        .mergeMap((payload: number) => {
            return this.api.getPaths(payload)
                .mergeMap((res: MapPath[]) => {
                    const items = toIndexedList(res);
                    return [
                        new SetMapPathsAction(items),
                        new GetMapPathsSuccessAction()
                    ];
                })
                .catch(() => {
                    return [
                        new GetMapPathsFailAction()
                    ];
                });
        });

    @Effect() saveMapLocation: Observable<any> = this.actions$
        .ofType(SAVE_MAP_LOCATION)
        .map((action: MapAction) => action.payload)
        .map(payload => {
            if (payload.id) {
                this.store.dispatch(new SaveMapLocationSuccessAction(payload));
            }
            return payload;
        })
        .mergeMap((payload: MapLocation) => {
            return this.api.saveMapLocation(payload)
                .mergeMap((res: MapLocation) => {
                    return [
                        new SaveMapLocationSuccessAction(res),
                        new OperationSuccessAction(sm.SAVE_MAP_LOCATION_SUCCESS)];
                })
                .catch(() => [
                    new SaveMapLocationFailAction(),
                    new DeleteMapLocationSuccessAction(payload),
                    new OperationFailAction(sm.SAVE_MAP_LOCATION_FAIL)
                ]);
        });

    @Effect() getMapLocation: Observable<any> = this.actions$
        .ofType(GET_MAP_LOCATIONS)
        .map((action: GetMapLocationsAction) => action.payload)
        .mergeMap((payload: number) => {
            return this.api.getMapLocations(payload)
                .mergeMap((res: MapLocation[]) => {
                    const items = toIndexedList(res, 'field');
                    return [
                        new SetMapLocationsAction(items),
                        new GetMapLocationsSuccessAction(),
                    ];
                })
                .catch(() => [
                    new SaveMapLocationFailAction(),
                ]);
        });
}

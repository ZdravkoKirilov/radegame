import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService, AppState } from '../../../../core';
import { MapLocation, MapPath } from '../../../../game-mechanics';

import {
    DeleteMapLocationSuccessAction,
    DeleteMapPathFailAction,
    DeleteMapPathSuccessAction, GetMapLocationsAction, GetMapLocationsSuccessAction,
    GetMapPathsAction, GetMapPathsFailAction, GetMapPathsSuccessAction,
    MapAction,
    SaveMapLocationFailAction,
    SaveMapLocationSuccessAction,
    SaveMapPathFailAction,
    SaveMapPathSuccessAction, SetMapLocationsAction, SetMapPathsAction
} from '../../actions';

import { OperationFailAction, OperationSuccessAction } from '../../../../core';
import { systemMessages as sm } from '../../../../shared';
import {
    DELETE_MAP_PATH, GET_MAP_LOCATIONS, GET_MAP_PATHS, SAVE_MAP_LOCATION,
    SAVE_MAP_PATH
} from '../../reducers';
import { toIndexedList } from '../../../../shared';

@Injectable()
export class MapEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() saveMapPath: Observable<any> = this.actions$.ofType(SAVE_MAP_PATH).pipe(
        map((action: MapAction) => action.payload),
        map(payload => {
            return payload;
        }),
        mergeMap(payload => {
            return this.api.saveMapPath(payload).pipe(
                mergeMap((res: MapPath) => {
                    return [new SaveMapPathSuccessAction(res), new OperationSuccessAction(sm.SAVE_MAP_PATH_SUCCESS)];
                }),
                catchError(() => {
                    return [new SaveMapPathFailAction(), new OperationFailAction(sm.SAVE_MAP_PATH_FAIL)];
                })
            );
        }),
    );

    @Effect() deleteMapPath: Observable<any> = this.actions$.ofType(DELETE_MAP_PATH).pipe(
        map((action: MapAction) => action.payload),
        map((payload) => {
            this.store.dispatch(new DeleteMapPathSuccessAction(payload));
            return payload;
        }),
        mergeMap((payload: MapPath) => {
            return this.api.deleteMapPath(payload).pipe(
                mergeMap(() => {
                    return [
                        new DeleteMapPathSuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_MAP_PATH_SUCCESS)
                    ];
                }),
                catchError(() => {
                    return [
                        new SaveMapPathSuccessAction(payload),
                        new DeleteMapPathFailAction(),
                        new OperationFailAction(sm.DELETE_MAP_PATH_FAIL)
                    ];
                })
            );
        })
    );

    @Effect() getMapPaths: Observable<any> = this.actions$.ofType(GET_MAP_PATHS).pipe(
        map((action: GetMapPathsAction) => action.payload),
        mergeMap((payload: number) => {
            return this.api.getPaths(payload).pipe(
                mergeMap((res: MapPath[]) => {
                    const items = toIndexedList(res);
                    return [
                        new SetMapPathsAction(items),
                        new GetMapPathsSuccessAction()
                    ];
                }),
                catchError(() => {
                    return [
                        new GetMapPathsFailAction()
                    ];
                })
            );
        })
    );

    @Effect() saveMapLocation: Observable<any> = this.actions$.ofType(SAVE_MAP_LOCATION).pipe(
        map((action: MapAction) => action.payload),
        map(payload => {
            if (payload.id) {
                this.store.dispatch(new SaveMapLocationSuccessAction(payload));
            }
            return payload;
        }),
        mergeMap((payload: MapLocation) => {
            return this.api.saveMapLocation(payload).pipe(
                mergeMap((res: MapLocation) => {
                    return [
                        new SaveMapLocationSuccessAction(res),
                        new OperationSuccessAction(sm.SAVE_MAP_LOCATION_SUCCESS)];
                }),
                catchError(() => [
                    new SaveMapLocationFailAction(),
                    new DeleteMapLocationSuccessAction(payload),
                    new OperationFailAction(sm.SAVE_MAP_LOCATION_FAIL)
                ])
            );
        })
    );

    @Effect() getMapLocation: Observable<any> = this.actions$.ofType(GET_MAP_LOCATIONS).pipe(
        map((action: GetMapLocationsAction) => action.payload),
        mergeMap((payload: number) => {
            return this.api.getMapLocations(payload).pipe(
                mergeMap((res: MapLocation[]) => {
                    const items = toIndexedList(res, 'field');
                    return [
                        new SetMapLocationsAction(items),
                        new GetMapLocationsSuccessAction(),
                    ];
                }),
                catchError(() => [
                    new SaveMapLocationFailAction(),
                ])
            );
        })
    );
}

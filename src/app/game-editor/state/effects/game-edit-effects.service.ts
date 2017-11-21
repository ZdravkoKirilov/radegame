import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/state/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import {GameEditService} from '../../../game-mechanics/services/game-edit.service';
import {Character, BoardField, Resource, Trivia, Game, MapLocation, MapPath, Map} from '../../../game-mechanics/models/index';
import * as actionTypes from '../actions/actionTypes';
import {
    Actions as CharacterAction,
    SaveCharacterSuccessAction,
    SaveCharacterFailAction
} from '../actions/byFeature/characterActions';

import {
    SaveFieldSuccessAction,
    SaveFieldFailAction,
    Actions as FieldAction,
    DeleteFieldSuccessAction,
    DeleteFieldFailAction,
    GetFieldsAction,
    GetFieldsSuccessAction,
    GetFieldsFailAction
} from '../actions/byFeature/fieldActions';

import {
    SaveResourceSuccessAction,
    SaveResourceFailAction,
    SaveResourceAction,
    AddResourceAction,
    DeleteResourceAction,
    RemoveResourceAction,
    DeleteResourceSuccessAction,
    DeleteResourceFailAction,
    Actions as ResourceAction
} from '../actions/byFeature/resourceActions';

import {SaveTriviaSuccessAction, SaveTriviaFailAction, Actions as TriviaAction} from '../actions/byFeature/triviaActions';
import {
    CreateGameSuccessAction,
    CreateGameFailAction,
    GetGamesSuccessAction,
    GetGamesFailAction,
    Actions as GameLauncherAction
} from '../actions/byFeature/launcherActions';

import {
    SaveMapLocationSuccessAction,
    SaveMapLocationFailAction,
    DeleteMapLocationSuccessAction,
    GetMapLocationsSuccessAction,
    GetMapLocationsFailAction,
    SaveMapPathSuccessAction,
    SaveMapPathFailAction,
    DeleteMapPathSuccessAction,
    DeleteMapPathFailAction,
    GetMapPathsSuccessAction,
    GetMapPathsFailAction,
    SaveMapSuccessAction,
    SaveMapFailAction,
    GetMapSuccessAction,
    GetMapFailAction,
    MapActions, GetMapPathsAction
} from '../actions/byFeature/mapActions';

import {OperationSuccessAction, OperationFailAction} from '../../../core/state/actions/actions';
import {systemMessages as sm} from '../../../shared/config/messages';

@Injectable()
export class GameEditEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() saveResource: Observable<Resource> = this.actions$
        .ofType(actionTypes.SAVE_RESOURCE)
        .map((action: SaveResourceAction) => action.payload)
        .mergeMap((payload: Resource) => {
            return this.api.saveResource(payload);
        })
        .mergeMap((res: Resource) => {
            return [
                new AddResourceAction(res),
                new SaveResourceSuccessAction(res),
                new OperationSuccessAction(sm.SAVE_RESOURCE_SUCCESS)
            ];
        })
        .catch(() => {
            return [new SaveResourceFailAction(), new OperationFailAction(sm.SAVE_RESOURCE_FAIL)];
        });

    @Effect() deleteResource: Observable<Resource> = this.actions$
        .ofType(actionTypes.DELETE_RESOURCE)
        .map((action: DeleteResourceAction) => action.payload)
        .mergeMap((payload: Resource) => {
            return this.api.deleteResource(payload);
        })
        .mergeMap((res: Resource) => {
            return [
                new RemoveResourceAction(res),
                new DeleteResourceSuccessAction(res),
                new OperationSuccessAction(sm.DELETE_RESOURCE_SUCCESS)
            ];
        })
        .catch(() => {
            return [new DeleteResourceFailAction(), new OperationFailAction(sm.DELETE_RESOURCE_FAIL)];
        });

    @Effect() saveMap: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_MAP)
        .map((action: MapActions) => action.payload)
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
        .ofType(actionTypes.GET_MAP)
        .mergeMap((action: MapActions) => {
            return this.api.getMaps(action.payload.gameId);
        })
        .map((res: Map[]) => {
            return new GetMapSuccessAction(res[0]);
        })
        .catch(() => {
            return of(new GetMapFailAction());
        });

    @Effect() saveField: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_FIELD)
        .map((action: FieldAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: BoardField) => {
            return this.api.saveBoardField(payload);
        })
        .mergeMap((res: BoardField) => {
            return [new SaveFieldSuccessAction(res), new OperationSuccessAction(sm.SAVE_FIELD_SUCCESS)];
        })
        .catch(() => {
            return [new SaveFieldFailAction(), new OperationFailAction(sm.SAVE_FIELD_FAIL)];
        });

    @Effect() getFields: Observable<BoardField> = this.actions$
        .ofType(actionTypes.GET_FIELDS)
        .mergeMap((action: GetFieldsAction) => {
            return this.api.getFields(action.payload.gameId);
        })
        .map((res: BoardField[]) => {
            return new GetFieldsSuccessAction(res);
        })
        .catch(() => {
            return of(new GetFieldsFailAction());
        });

    @Effect() deleteField: Observable<any> = this.actions$
        .ofType(actionTypes.DELETE_FIELD)
        .map((action: FieldAction) => action.payload)
        .map((payload: BoardField) => {
            if (payload.id) {
                this.store.dispatch(new DeleteFieldSuccessAction(payload));
            }
            return payload;
        })
        .mergeMap((payload: BoardField) => {
            return this.api.deleteBoardField(payload)
                .mergeMap(() => {
                    return [
                        new DeleteFieldSuccessAction(payload),
                        new DeleteMapLocationSuccessAction({field: payload.id}),
                        new GetMapPathsAction({gameId: payload.game}),
                        new OperationSuccessAction(sm.DELETE_FIELD_SUCCESS)
                    ];
                })
                .catch(() => {
                    const actions: any[] = [new DeleteFieldFailAction(), new OperationFailAction(sm.DELETE_FIELD_FAIL)];
                    if (payload.id) {
                        actions.push(new SaveFieldSuccessAction(payload));
                    }
                    return actions;
                });
        });

    @Effect() saveMapPath: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_MAP_PATH)
        .map((action: MapActions) => action.payload)
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
        .ofType(actionTypes.DELETE_MAP_PATH)
        .map((action: MapActions) => action.payload)
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

    @Effect() saveMapLocation: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_MAP_LOCATION)
        .map((action: MapActions) => action.payload)
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

    @Effect() getMapLocations: Observable<any> = this.actions$
        .ofType(actionTypes.GET_MAP_LOCATIONS)
        .mergeMap((action: MapActions) => {
            return this.api.getMapLocations(action.payload.gameId);
        })
        .map((res: MapLocation[]) => {
            return new GetMapLocationsSuccessAction(res);
        })
        .catch(() => {
            return of(new GetMapLocationsFailAction());
        });

    @Effect() saveCharacter: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_CHARACTER)
        .mergeMap((action: CharacterAction) => {
            return this.api.saveGameCharacter(action.payload);
        })
        .mergeMap((res: Character) => {
            return [new SaveCharacterSuccessAction(res)];
        })
        .catch(() => {
            return of(new SaveCharacterFailAction());
        });

    @Effect() getMapPaths: Observable<any> = this.actions$
        .ofType(actionTypes.GET_MAP_PATHS)
        .mergeMap((action: MapActions) => {
            return this.api.getPaths(action.payload.gameId);
        })
        .map((res: MapPath[]) => {
            return new GetMapPathsSuccessAction(res);
        })
        .catch(() => {
            return of(new GetMapPathsFailAction());
        });

    @Effect() saveTrivia: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_TRIVIA)
        .mergeMap((action: TriviaAction) => {
            return this.api.saveGameTrivia(action.payload);
        })
        .map((res: Trivia) => {
            return new SaveTriviaSuccessAction(res);
        })
        .catch(() => {
            return of(new SaveTriviaFailAction());
        });

    @Effect() saveGame: Observable<any> = this.actions$
        .ofType(actionTypes.CREATE_GAME)
        .mergeMap((action: GameLauncherAction) => {
            return this.api.saveGame(action.payload);
        })
        .mergeMap((res: Game) => {
            return [new CreateGameSuccessAction(res)];
        })
        .catch(() => {
            return of(new CreateGameFailAction());
        });
    @Effect() getGames: Observable<any> = this.actions$
        .ofType(actionTypes.GET_GAMES)
        .mergeMap(() => {
            return this.api.getGames();
        })
        .map((res: Game[]) => {
            return new GetGamesSuccessAction(res);
        })
        .catch(() => {
            return of(new GetGamesFailAction());
        });
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../services/game-edit.service';
import { BoardField, Faction, Game, GameMap, MapLocation, MapPath, Resource, Trivia, Activity } from '../../../game-mechanics/models/index';
import {
    AddFactionAction,
    DeleteFactionFailAction,
    DeleteFactionSuccessAction,
    FactionAction as FactionAction,
    RemoveFactionAction,
    SaveFactionFailAction,
    SaveFactionSuccessAction
} from '../actions/byFeature/faction.action';

import {
    DeleteFieldFailAction,
    DeleteFieldSuccessAction,
    FieldAction as FieldAction,
    SaveFieldFailAction,
    SaveFieldSuccessAction,
} from '../actions/byFeature/field.action';

import {
    AddResourceAction,
    DeleteResourceAction,
    DeleteResourceFailAction,
    DeleteResourceSuccessAction,
    RemoveResourceAction,
    SaveResourceAction,
    SaveResourceFailAction,
    SaveResourceSuccessAction
} from '../actions/byFeature/resource.action';

import { SaveTriviaFailAction, SaveTriviaSuccessAction, TriviaAction as TriviaAction } from '../actions/byFeature/trivia.action';
import { CreateGameFailAction, CreateGameSuccessAction, LauncherAction as GameLauncherAction } from '../actions/byFeature/launcher.action';

import {
    DeleteMapLocationSuccessAction,
    DeleteMapPathFailAction,
    DeleteMapPathSuccessAction,
    GetMapFailAction,
    GetMapPathsAction,
    GetMapSuccessAction,
    MapAction,
    SaveMapFailAction,
    SaveMapLocationFailAction,
    SaveMapLocationSuccessAction,
    SaveMapPathFailAction,
    SaveMapPathSuccessAction,
    SaveMapSuccessAction
} from '../actions/byFeature/map.action';

import {
    SaveActivityAction,
    SaveActivitySuccessAction,
    SaveActivityFailAction,
    AddActivityAction,
    DeleteActivityAction,
    DeleteActivitySuccessAction,
    DeleteActivityFailAction,
    RemoveActivityAction,
} from '../actions/byFeature/activity.action';

import { OperationFailAction, OperationSuccessAction } from '../../../core/state/actions/actions';
import { systemMessages as sm } from '../../../shared/config/messages';
import { DELETE_RESOURCE, SAVE_RESOURCE } from '../reducers/byFeature/resources.reducer';
import { DELETE_FACTION, SAVE_FACTION } from '../reducers/byFeature/factions.reducer';
import { DELETE_FIELD, SAVE_FIELD } from '../reducers/byFeature/fields.reducer';
import { SAVE_TRIVIA } from '../reducers/byFeature/trivia.reducer';
import { DELETE_MAP_PATH, GET_MAP, SAVE_MAP, SAVE_MAP_LOCATION, SAVE_MAP_PATH } from '../reducers/byFeature/map.reducer';
import { CREATE_GAME } from '../reducers/byFeature/games.reducer';
import { SAVE_ACTIVITY, DELETE_ACTIVITY } from '../reducers/byFeature/activity.reducer';

@Injectable()
export class GameEditEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() saveActivity: Observable<any> = this.actions$
        .ofType(SAVE_ACTIVITY)
        .map((action: SaveActivityAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: Activity) => {
            return this.api.saveActivity(payload);
        })
        .mergeMap((res: Activity) => {
            return [
                new AddActivityAction(res),
                new SaveActivitySuccessAction(res),
                new OperationSuccessAction(sm.SAVE_FACTION_SUCCESS)
            ];
        })
        .catch(() => {
            return [new SaveActivityFailAction(), new OperationFailAction(sm.SAVE_FACTION_FAIL)];
        });

    @Effect() deleteActivity: Observable<any> = this.actions$
        .ofType(DELETE_ACTIVITY)
        .map((action: DeleteActivityAction) => action.payload)
        .mergeMap((payload: Activity) => {
            return this.api.deleteActivity(payload)
                .mergeMap(() => {
                    return [
                        new RemoveActivityAction(payload),
                        new DeleteActivitySuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_FACTION_SUCCESS)
                    ];
                })
                .catch(() => {
                    return [new DeleteActivityFailAction(), new OperationFailAction(sm.DELETE_FACTION_FAIL)];
                });
        });

    @Effect() saveFaction: Observable<any> = this.actions$
        .ofType(SAVE_FACTION)
        .map((action: FactionAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: Faction) => {
            return this.api.saveFaction(payload);
        })
        .mergeMap((res: Faction) => {
            return [
                new AddFactionAction(res),
                new SaveFactionSuccessAction(res),
                new OperationSuccessAction(sm.SAVE_FACTION_SUCCESS)
            ];
        })
        .catch(() => {
            return [new SaveFactionFailAction(), new OperationFailAction(sm.SAVE_FACTION_FAIL)];
        });

    @Effect() deleteFaction: Observable<any> = this.actions$
        .ofType(DELETE_FACTION)
        .map((action: FactionAction) => action.payload)
        .mergeMap((payload: Faction) => {
            return this.api.deleteFaction(payload)
                .mergeMap(() => {
                    return [
                        new RemoveFactionAction(payload),
                        new DeleteFactionSuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_FACTION_SUCCESS)
                    ];
                })
                .catch(() => {
                    return [new DeleteFactionFailAction(), new OperationFailAction(sm.DELETE_FACTION_FAIL)];
                });
        });

    @Effect() saveResource: Observable<any> = this.actions$
        .ofType(SAVE_RESOURCE)
        .map((action: SaveResourceAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
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

    @Effect() deleteResource: Observable<any> = this.actions$
        .ofType(DELETE_RESOURCE)
        .map((action: DeleteResourceAction) => action.payload)
        .mergeMap((payload: Resource) => {
            return this.api.deleteResource(payload)
                .mergeMap(() => {
                    return [
                        new RemoveResourceAction(payload),
                        new DeleteResourceSuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_RESOURCE_SUCCESS)
                    ];
                })
                .catch(() => {
                    return [new DeleteResourceFailAction(), new OperationFailAction(sm.DELETE_RESOURCE_FAIL)];
                });
        });

    @Effect() saveMap: Observable<any> = this.actions$
        .ofType(SAVE_MAP)
        .map((action: MapAction) => action.payload)
        .mergeMap((payload: GameMap) => {
            return this.api.saveMap(payload);
        })
        .mergeMap((res: GameMap) => {
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
        .map((res: GameMap[]) => {
            return new GetMapSuccessAction(res[0]);
        })
        .catch(() => {
            return of(new GetMapFailAction());
        });

    @Effect() saveField: Observable<any> = this.actions$
        .ofType(SAVE_FIELD)
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

    @Effect() deleteField: Observable<any> = this.actions$
        .ofType(DELETE_FIELD)
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
                        new GetMapPathsAction(payload.game),
                        new OperationSuccessAction(sm.DELETE_FIELD_SUCCESS),
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

    @Effect() saveTrivia: Observable<any> = this.actions$
        .ofType(SAVE_TRIVIA)
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
        .ofType(CREATE_GAME)
        .mergeMap((action: GameLauncherAction) => {
            return this.api.saveGame(action.payload);
        })
        .mergeMap((res: Game) => {
            return [new CreateGameSuccessAction(res)];
        })
        .catch(() => {
            return of(new CreateGameFailAction());
        });
}

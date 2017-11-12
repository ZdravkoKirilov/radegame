import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { decode } from 'base64-arraybuffer';

import { GameEditService } from '../../../shared/services/game-edit.service';
import { Character, BoardField, Resource, Trivia, Game, MapFieldSettings, MapPath } from '../../../game-mechanics/models/index';
import { GridFieldPayload } from '../../models/index';
import * as actionTypes from '../actions/actionTypes';
import {
    Actions as CharacterAction,
    SaveCharacterSuccessAction,
    SaveCharacterFailAction
} from '../actions/byFeature/characterActions';

import {
    SaveFieldSuccessAction, SaveFieldFailAction, Actions as FieldAction, DeleteFieldSuccessAction, DeleteFieldFailAction, GetFieldsAction,
    GetFieldsSuccessAction, GetFieldsFailAction
} from '../actions/byFeature/fieldActions';

import { AddGridFieldAction } from '../actions/byFeature/gridActions';

import {
    SaveResourceSuccessAction,
    SaveResourceFailAction,
    Actions as ResourceAction
} from '../actions/byFeature/resourceActions';

import { SaveTriviaSuccessAction, SaveTriviaFailAction, Actions as TriviaAction } from '../actions/byFeature/triviaActions';
import {
    CreateGameSuccessAction,
    CreateGameFailAction,
    GetGamesSuccessAction,
    GetGamesFailAction,
    Actions as GameLauncherAction
} from '../actions/byFeature/launcherActions';

import {
    SaveMapFieldFailAction,
    SaveMapFieldSuccessAction,
    DeleteMapFieldSuccessAction,
    DeleteMapFieldFailAction,
    SaveMapPathSuccessAction,
    SaveMapPathFailAction,
    DeleteMapPathSuccessAction,
    DeleteMapPathFailAction,
    MapActions
} from '../actions/byFeature/mapActions';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameEditEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

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

    @Effect() saveField: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_FIELD)
        .map((action: FieldAction) => {
            const payload: BoardField = action.payload;
            if (payload.image && payload.image.startsWith('http://')) {
                delete payload.image;
            }
            if (payload.asMapItem) {
                payload.asMapItem = JSON.stringify(payload.asMapItem);
            }
            return payload;
        })
        .mergeMap((payload: BoardField) => {
            return this.api.saveBoardField(payload);
        })
        .mergeMap((res: BoardField) => {
            const field: BoardField = res;
            if (field.asMapItem) {
                field.asMapItem = JSON.parse((field.asMapItem as any));
            }
            return [new SaveFieldSuccessAction(field as any)];
        })
        .catch(() => {
            return of(new SaveFieldFailAction());
        });

    @Effect() getFields: Observable<any> = this.actions$
        .ofType(actionTypes.GET_FIELDS)
        .mergeMap((action: GetFieldsAction) => {
            return this.api.getFields(action.payload.gameId);
        })
        .map((res: BoardField[]) => {
            const formatted = res.map(elem => {
                if (elem.asMapItem) {
                    elem.asMapItem = JSON.parse((elem.asMapItem as any));
                }
                return elem;
            });
            return new GetFieldsSuccessAction(formatted);
        })
        .catch(() => {
            return of(new GetFieldsFailAction());
        });

    @Effect() deleteField: Observable<any> = this.actions$
        .ofType(actionTypes.DELETE_FIELD)
        .mergeMap((action: FieldAction) => {
            return this.api.deleteBoardField(action.payload);
        })
        .map((res: BoardField) => {
            return new DeleteFieldSuccessAction(res);
        })
        .catch(() => {
            return of(new DeleteFieldFailAction());
        });

    // @Effect() saveMapField: Observable<any> = this.actions$
    //     .ofType(actionTypes.SAVE_MAP_FIELD)
    //     .mergeMap((action: MapActions) => {
    //         return this.api.saveMapField(action.payload);
    //     })
    //     .map((res: MapFieldSettings) => {
    //         return new SaveMapFieldSuccessAction(res);
    //     })
    //     .catch(() => {
    //         return of(new SaveMapFieldFailAction());
    //     });
    @Effect() deleteMapField: Observable<any> = this.actions$
        .ofType(actionTypes.DELETE_MAP_FIELD)
        .mergeMap((action: MapActions) => {
            return this.api.deleteMapField(action.payload);
        })
        .map((res: MapFieldSettings) => {
            return new DeleteMapFieldSuccessAction(res);
        })
        .catch(() => {
            return of(new DeleteMapFieldFailAction());
        });

    @Effect() saveMapPath: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_MAP_PATH)
        .mergeMap((action: MapActions) => {
            return this.api.saveMapPath(action.payload);
        })
        .map((res: MapPath) => {
            return new SaveMapPathSuccessAction(res);
        })
        .catch(() => {
            return of(new SaveMapPathFailAction());
        });
    @Effect() deleteMapPath: Observable<any> = this.actions$
        .ofType(actionTypes.DELETE_MAP_PATH)
        .mergeMap((action: MapActions) => {
            return this.api.deleteMapPath(action.payload);
        })
        .map((res: MapPath) => {
            return new DeleteMapPathSuccessAction(res);
        })
        .catch(() => {
            return of(new DeleteMapPathFailAction());
        });

    @Effect() saveResource: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_RESOURCE)
        .mergeMap((action: ResourceAction) => {
            return this.api.saveGameResource(action.payload);
        })
        .map((res: Resource) => {
            return new SaveResourceSuccessAction(res);
        })
        .catch(() => {
            return of(new SaveResourceFailAction());
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

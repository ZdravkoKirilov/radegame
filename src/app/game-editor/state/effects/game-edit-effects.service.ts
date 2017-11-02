import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {GameEditService} from '../../../shared/services/game-edit.service';
import {Character, BoardField, Resource, Trivia, Game, MapFieldSettings} from '../../../game-mechanics/models/index';
import {GridFieldPayload} from '../../models/index';
import * as actionTypes from '../actions/actionTypes';
import {
    Actions as CharacterAction,
    SaveCharacterSuccessAction,
    SaveCharacterFailAction
} from '../actions/byFeature/characterActions';

import {
    SaveFieldSuccessAction, SaveFieldFailAction, AddGridFieldAction, Actions as FieldAction, DeleteFieldSuccessAction, DeleteFieldFailAction
} from '../actions/byFeature/fieldActions';

import {
    SaveResourceSuccessAction,
    SaveResourceFailAction,
    Actions as ResourceAction
} from '../actions/byFeature/resourceActions';

import {SaveTriviaSuccessAction, SaveTriviaFailAction, Actions as TriviaAction} from '../actions/byFeature/triviaActions';
import {
    CreateGameSuccessAction,
    CreateGameFailAction,
    Actions as GameLauncherAction
} from '../actions/byFeature/launcherActions';

import {SaveMapFieldFailAction, SaveMapFieldSuccessAction, MapActions} from '../actions/byFeature/mapActions';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';


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
        .map((action: FieldAction) => action.payload)
        .mergeMap((payload: GridFieldPayload) => {
            return Observable.forkJoin([this.api.saveBoardField(payload.data), of(payload.coords)]);
        })
        .mergeMap((res: any[]) => {
            const field: BoardField = res[0];
            const coords = res[1];
            if (coords) {
                const fieldWithCoords: GridFieldPayload = {
                    data: field,
                    coords
                };
                return [new SaveFieldSuccessAction(field), new AddGridFieldAction(fieldWithCoords)];
            } else {
                return [new SaveFieldSuccessAction(field)];
            }

        })
        .catch(() => {
            return of(new SaveFieldFailAction());
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

    @Effect() saveMapField: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_MAP_FIELD)
        .mergeMap((action: MapActions) => {
            return this.api.saveBoardMapField(action.payload);
        })
        .map((res: MapFieldSettings) => {
            return new SaveMapFieldSuccessAction(res);
        })
        .catch(() => {
            return of(new SaveMapFieldFailAction());
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
        .map((res: Game) => {
            return new CreateGameSuccessAction(res);
        })
        .catch(() => {
            return of(new CreateGameFailAction());
        });
}

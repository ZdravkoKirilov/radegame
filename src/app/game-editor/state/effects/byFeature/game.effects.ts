import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../../core';
import { Game } from '../../../../game-mechanics';

import {
    SetGamesAction,
    GetGamesAction,
    GetGamesSuccessAction,
    GetGamesFailAction,
    CreateGameAction,
    CreateGameFailAction,
    CreateGameSuccessAction,
} from '../../actions';

import { OperationFailAction, OperationSuccessAction } from '../../../../core';
import { systemMessages as sm, toIndexedList } from '../../../../shared';
import { CREATE_GAME, GET_GAMES } from '../../reducers';

@Injectable()
export class GameEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() saveGame: Observable<any> = this.actions$
        .ofType(CREATE_GAME)
        .mergeMap((action: CreateGameAction) => {
            return this.api.saveGame(action.payload);
        })
        .mergeMap((res: Game) => {
            return [new CreateGameSuccessAction(res)];
        })
        .catch(() => {
            return of(new CreateGameFailAction());
        });

    @Effect() getGames: Observable<any> = this.actions$
        .ofType(GET_GAMES)
        .mergeMap((action: GetGamesAction) => {
            return this.api.getGames();
        })
        .mergeMap((res: Game[]) => {
            const items = toIndexedList(res);
            return [new SetGamesAction(items), new GetGamesSuccessAction()];
        })
        .catch(() => {
            return of(new GetGamesFailAction());
        });
}

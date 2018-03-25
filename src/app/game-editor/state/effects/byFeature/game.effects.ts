import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { GameEditService, AppState } from '../../../../core';
import { Game } from '../../../../game-mechanics';

import {
    CreateGameAction,
    CreateGameFailAction,
    CreateGameSuccessAction,
} from '../../actions';

import { toIndexedList } from '../../../../shared';
import { CREATE_GAME } from '../../reducers';

@Injectable()
export class GameEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() saveGame: Observable<any> = this.actions$.ofType(CREATE_GAME).pipe(
        mergeMap((action: CreateGameAction) => {
            return this.api.saveGame(action.payload);
        }),
        mergeMap((res: Game) => {
            return [new CreateGameSuccessAction(res)];
        }),
        catchError(() => {
            return of(new CreateGameFailAction());
        })
    );
}

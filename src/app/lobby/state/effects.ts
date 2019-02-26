import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
    FetchLobbiesFail, FetchLobbies, FetchLobby, FetchLobbyFail, FetchGame, FetchGameFail, FetchGameSuccess
} from './actions';
import { FETCH_LOBBIES, FETCH_LOBBY, FETCH_GAME } from './actionTypes';
import { LobbyService } from '../services/lobby.service';
import { GameFetchService } from '@app/core';

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
        private api: LobbyService,
        private fetcher: GameFetchService
    ) { }

    @Effect()
    fetchGame = this.actions$.ofType<FetchGame>(FETCH_GAME).pipe(
        mergeMap(action => {
            return this.fetcher.getGame(action.payload).pipe(
                map(response => {
                    return new FetchGameSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchGameFail());
                })
            )
        })
    )

    @Effect()
    fetchLobbies = this.actions$.ofType<FetchLobbies>(FETCH_LOBBIES).pipe(
        mergeMap(action => {
            return this.api.fetchLobbies().pipe(
                map(response => {

                }),
                catchError(() => {
                    return of(new FetchLobbiesFail());
                })
            )
        }),
    );

    @Effect()
    fetchLobby = this.actions$.ofType<FetchLobby>(FETCH_LOBBY).pipe(
        mergeMap(action => {
            return this.api.fetchLobby(action.payload).pipe(
                map(response => {

                }),
                catchError(() => {
                    return of(new FetchLobbyFail());
                })
            )
        }),
    );
}
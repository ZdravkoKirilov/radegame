import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
    FetchLobbiesFail, FetchLobbies, FetchLobby, FetchLobbyFail, FetchGame, FetchGameFail, FetchGameSuccess, FetchLobbiesSuccess, FetchPlayers, FetchPlayersFail, FetchPlayersSuccess
} from './actions';
import { FETCH_LOBBIES, FETCH_LOBBY, FETCH_GAME, FETCH_PLAYERS } from './actionTypes';
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
                    return new FetchLobbiesSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchLobbiesFail());
                })
            )
        }),
    );

    @Effect()
    fetchPlayers = this.actions$.ofType<FetchPlayers>(FETCH_PLAYERS).pipe(
        mergeMap(action => {
            return this.api.fetchPlayers(action.payload).pipe(
                map(response => {
                    return new FetchPlayersSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchPlayersFail())
                })
            )
        })
    )

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
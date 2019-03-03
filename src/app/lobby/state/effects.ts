import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
    FetchLobbiesFail, FetchLobbies, FetchGame, FetchGameFail,
    FetchGameSuccess, FetchLobbiesSuccess, FetchPlayers, FetchPlayersFail, FetchPlayersSuccess,
    FetchAllPlayers, FetchAllPlayersSuccess, FetchAllPlayersFail, CreateLobby, CreateLobbyFail, CreateLobbySuccess, AddLobby, CreatePlayer, CreatePlayerFail, AddPlayer, CreatePlayerSuccess, FetchLobby, FetchLobbyFail, FetchLobbySuccess, FetchTeams, FetchTeamsSuccess, FetchTeamsFail, FetchFactions, FetchFactionsSuccess, FetchFactionsFail, FetchImages, FetchImagesSuccess, FetchImagesFail
} from './actions';
import { FETCH_LOBBIES, FETCH_GAME, FETCH_PLAYERS, FETCH_ALL_PLAYERS, CREATE_LOBBY, CREATE_PLAYER, FETCH_LOBBY, FETCH_TEAMS, FETCH_FACTIONS, FETCH_IMAGES } from './actionTypes';
import { LobbyService } from '../services/lobby.service';
import { GameFetchService } from '@app/core';

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
        private api: LobbyService,
        private fetcher: GameFetchService,
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
    fetchLobby = this.actions$.ofType<FetchLobby>(FETCH_LOBBY).pipe(
        mergeMap(action => {
            return this.api.fetchLobby(action.payload).pipe(
                map(response => {
                    return new FetchLobbySuccess(response);
                }),
                catchError(() => {
                    return of(new FetchLobbyFail());
                })
            );
        })
    )

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
    fetchAllPlayers = this.actions$.ofType<FetchAllPlayers>(FETCH_ALL_PLAYERS).pipe(
        mergeMap(action => {
            return this.api.fetchAllPlayers().pipe(
                map(response => {
                    return new FetchAllPlayersSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchAllPlayersFail())
                })
            )
        })
    )

    @Effect()
    saveLobby = this.actions$.ofType<CreateLobby>(CREATE_LOBBY).pipe(
        mergeMap(action => this.api.createLobby(action.payload).pipe(
            mergeMap(response => {

                return [
                    new AddLobby(response.lobby),
                    new AddPlayer(response.owner),
                    new CreateLobbySuccess(),
                ];
            }),
            catchError(() => {
                return of(new CreateLobbyFail());
            })
        ))
    )

    @Effect()
    savePlayer = this.actions$.ofType<CreatePlayer>(CREATE_PLAYER).pipe(
        mergeMap(action => this.api.savePlayer(action.payload).pipe(
            map(response => {
                return [
                    new AddPlayer(response),
                    new CreatePlayerSuccess(),
                ];
            }),
            catchError(() => {
                return of(new CreatePlayerFail())
            })
        ))
    )

    @Effect()
    fetchTeams = this.actions$.ofType<FetchTeams>(FETCH_TEAMS).pipe(
        mergeMap(action => {
            return this.fetcher.getTeams(action.payload).pipe(
                map(response => {
                    return new FetchTeamsSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchTeamsFail());
                })
            )
        }),
    );

    @Effect()
    fetchFactions = this.actions$.ofType<FetchFactions>(FETCH_FACTIONS).pipe(
        mergeMap(action => {
            return this.fetcher.getFactions(action.payload).pipe(
                map(response => {
                    return new FetchFactionsSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchFactionsFail());
                })
            )
        }),
    );

    @Effect()
    fetchImages = this.actions$.ofType<FetchImages>(FETCH_IMAGES).pipe(
        mergeMap(action => {
            return this.fetcher.getImages(action.payload).pipe(
                map(response => {
                    return new FetchImagesSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchImagesFail());
                })
            )
        }),
    );
}
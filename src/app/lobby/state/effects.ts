import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import {
    FetchLobbiesFail, FetchLobbies, FetchGame, FetchGameFail,
    FetchGameSuccess, FetchLobbiesSuccess, FetchPlayers, FetchPlayersFail, FetchPlayersSuccess,
    FetchAllPlayers, FetchAllPlayersSuccess, FetchAllPlayersFail, CreateLobby, CreateLobbyFail,
    CreateLobbySuccess, AddLobby, CreatePlayer, SavePlayer, FetchLobby, FetchLobbyFail, FetchLobbySuccess,
    FetchTeams, FetchTeamsSuccess, FetchTeamsFail, FetchFactions, FetchFactionsSuccess, FetchFactionsFail,
    FetchImages, FetchImagesSuccess, FetchImagesFail, RemoveLobby, RemovePlayers, RemovePlayer, UpdatePlayer,
    DeletePlayer, DeleteLobby, SendMessage, SaveMessage, FetchSetups, FetchSetupsSuccess, FetchSetupsFail, CreateGame, CreateGameSuccess, CreateGameFail
} from './actions';
import {
    FETCH_LOBBIES, FETCH_GAME, FETCH_PLAYERS, FETCH_ALL_PLAYERS, CREATE_LOBBY,
    CREATE_PLAYER, FETCH_LOBBY, FETCH_TEAMS, FETCH_FACTIONS, FETCH_IMAGES, REMOVE_LOBBY, REMOVE_PLAYER, SAVE_PLAYER,
    UPDATE_PLAYER, DELETE_PLAYER, DELETE_LOBBY, SEND_MESSAGE, SAVE_MESSAGE, FETCH_SETUPS, CREATE_GAME
} from './actionTypes';
import { LobbyService } from '../services/lobby.service';
import { GameFetchService, AppState, AddActiveGame } from '@app/core';
import { LiveLobbyService } from '../services/live-lobbies.service';
import { getPlayers } from './selectors';
import { GameArenaService } from 'app/core/services/arena/game-arena.service';

@Injectable()
export class LobbyEffects {
    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private api: LobbyService,
        private sockets: LiveLobbyService,
        private fetcher: GameFetchService,
        private arenaApi: GameArenaService
    ) { }


    @Effect()
    onMessageReceive = this.sockets.ofType<SaveMessage>(SAVE_MESSAGE).pipe(
        map(action => {
            return new SaveMessage(action.payload);
        })
    )

    @Effect()
    onLobbyCreated = this.sockets.ofType<CreateLobby>(CREATE_LOBBY).pipe(
        mergeMap(action => {
            return [
                new AddLobby(action.payload.lobby),
                new SavePlayer(action.payload.owner),
            ];
        })
    );

    @Effect()
    onLobbyDeleted = this.sockets.ofType<RemoveLobby>(REMOVE_LOBBY).pipe(
        withLatestFrom(this.store.pipe(select(getPlayers))),
        mergeMap(([action, players]) => {
            const playersPendingDelete = players
                .filter(elem => elem.lobby === action.payload)
                .map(elem => elem.name);
            return [
                new RemoveLobby(action.payload),
                new RemovePlayers(playersPendingDelete),
            ];
        })
    );

    @Effect()
    onPlayerDeleted = this.sockets.ofType<RemovePlayer>(REMOVE_PLAYER).pipe(
        map(action => {
            return new RemovePlayer(action.payload);
        }),
    );

    @Effect()
    onPlayerSave = this.sockets.ofType<SavePlayer>(SAVE_PLAYER).pipe(
        map(action => {
            return new SavePlayer(action.payload);
        })
    );

    @Effect()
    fetchGame = this.actions$.pipe(
        ofType<FetchGame>(FETCH_GAME),
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
    fetchLobbies = this.actions$.pipe(
        ofType<FetchLobbies>(FETCH_LOBBIES),
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
    fetchLobby = this.actions$.pipe(
        ofType<FetchLobby>(FETCH_LOBBY),
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
    fetchPlayers = this.actions$.pipe(
        ofType<FetchPlayers>(FETCH_PLAYERS),
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
    fetchAllPlayers = this.actions$.pipe(
        ofType<FetchAllPlayers>(FETCH_ALL_PLAYERS),
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
    saveLobby = this.actions$.pipe(
        ofType<CreateLobby>(CREATE_LOBBY),
        mergeMap(action => this.api.createLobby(action.payload).pipe(
            mergeMap(response => {

                return [
                    new AddLobby(response.lobby),
                    new SavePlayer(response.owner),
                    new CreateLobbySuccess(),
                ];
            }),
            catchError(() => {
                return of(new CreateLobbyFail());
            })
        ))
    )

    @Effect()
    deleteLobby = this.actions$.pipe(
        ofType<DeleteLobby>(DELETE_LOBBY),
        mergeMap(action => this.api.deleteLobby(action.payload).pipe(
            map(() => {
                return new RemoveLobby(action.payload);
            }),
            catchError(() => {
                return of(new CreateLobbyFail());
            })
        ))
    )


    @Effect({ dispatch: false })
    savePlayer = this.actions$.pipe(
        ofType<CreatePlayer | UpdatePlayer>(CREATE_PLAYER, UPDATE_PLAYER),
        map(action => this.sockets.savePlayer(action))
    )

    @Effect({ dispatch: false })
    deletePlayer = this.actions$.pipe(
        ofType<DeletePlayer>(DELETE_PLAYER),
        map(action => this.sockets.removePlayer(action))
    )

    @Effect({ dispatch: false })
    sendMessage = this.actions$.pipe(
        ofType<SendMessage>(SEND_MESSAGE),
        map(action => this.sockets.sendMessage(action))
    )

    @Effect()
    fetchTeams = this.actions$.pipe(
        ofType<FetchTeams>(FETCH_TEAMS),
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
    fetchSetups = this.actions$.pipe(
        ofType<FetchSetups>(FETCH_SETUPS),
        mergeMap(action => {
            return this.fetcher.getSetups(action.payload).pipe(
                map(response => {
                    return new FetchSetupsSuccess(response);
                }),
                catchError(() => {
                    return of(new FetchSetupsFail());
                })
            )
        }),
    );

    @Effect()
    createGame = this.actions$.pipe(
        ofType<CreateGame>(CREATE_GAME),
        mergeMap(action => {
            return this.arenaApi.createGame(action.payload).pipe(
                mergeMap(response => {
                    return [new CreateGameSuccess(response), new AddActiveGame(response)];
                }),
                catchError(() => {
                    return of(new CreateGameFail());
                })
            )
        }),
    );

    @Effect()
    fetchFactions = this.actions$.pipe(
        ofType<FetchFactions>(FETCH_FACTIONS),
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
    fetchImages = this.actions$.pipe(
        ofType<FetchImages>(FETCH_IMAGES),
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
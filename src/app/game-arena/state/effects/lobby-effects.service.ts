import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import { LiveLobbyService } from '../../services';
import { AddMessage, LobbyActionTypes, SendMessage, CreateLobby, AddLobby, AddLobbies, DeleteLobby, RemoveLobby, SavePlayer, AddPlayer, DeletePlayer, RemovePlayer, FetchLobbies, RemoveMessages, RemovePlayers } from '../actions';

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
        private sockets$: LiveLobbyService,
    ) { }

    @Effect({ dispatch: false })
    sendMessage = this.actions$.pipe(
        ofType<SendMessage>(LobbyActionTypes.SEND_MESSAGE),
        map(action => this.sockets$.sendMessage(action)),
    );
    @Effect()
    onMessageReceive = this.sockets$.pipe(
        ofType<AddMessage>(LobbyActionTypes.ADD_MESSAGE),
        map(action => {
            return new AddMessage(action.payload);
        })
    );


    @Effect({ dispatch: false })
    fetchLobbies = this.actions$.pipe(
        ofType<FetchLobbies>(LobbyActionTypes.FETCH_LOBBIES),
        map(action => this.sockets$.fetchLobbies(action))
    )
    @Effect()
    onLobbiesFetched = this.sockets$.pipe(
        ofType<AddLobbies>(LobbyActionTypes.ADD_LOBBIES),
        map(action => new AddLobbies(action.payload)),
    )


    @Effect({ dispatch: false })
    createLobby = this.actions$.pipe(
        ofType<CreateLobby>(LobbyActionTypes.CREATE_LOBBY),
        map(action => this.sockets$.createLobby(action)),
    );
    @Effect()
    onLobbyCreated = this.sockets$.pipe(
        ofType<AddLobby>(LobbyActionTypes.ADD_LOBBY),
        map(action => new AddLobby(action.payload)),
    )


    @Effect({ dispatch: false })
    deleteLobby = this.actions$.pipe(
        ofType<DeleteLobby>(LobbyActionTypes.DELETE_LOBBY),
        map(action => this.sockets$.deleteLobby(action)),
    )
    @Effect()
    onLobbyDeleted = this.sockets$.pipe(
        ofType<RemoveLobby>(LobbyActionTypes.REMOVE_LOBBY),
        mergeMap(action => [
            new RemoveLobby(action.payload),
            new RemoveMessages({ messageIds: action.payload.messages.map(message => message.id) }),
            new RemovePlayers({ playerNames: action.payload.players.map(player => player.name) }),
        ]),
    )


    @Effect({ dispatch: false })
    savePlayer = this.actions$.pipe(
        ofType<SavePlayer>(LobbyActionTypes.SAVE_PLAYER),
        map(action => this.sockets$.savePlayer(action))
    )
    @Effect()
    onPlayerSaved = this.sockets$.pipe(
        ofType<AddPlayer>(LobbyActionTypes.ADD_PLAYER),
        map(action => new AddPlayer(action.payload))
    )


    @Effect({ dispatch: false })
    deletePlayer = this.actions$.pipe(
        ofType<DeletePlayer>(LobbyActionTypes.DELETE_PLAYER),
        map(action => this.sockets$.deletePlayer(action))
    )
    @Effect()
    onPlayerDeleted = this.sockets$.pipe(
        ofType<RemovePlayer>(LobbyActionTypes.REMOVE_PLAYER),
        map(action => new RemovePlayer(action.payload)),
    )
}
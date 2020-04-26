import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { LiveLobbyService } from '../../services';
import { AddMessage, LobbyActionTypes, SendMessage, CreateLobby, AddLobby, AddLobbies, DeleteLobby, RemoveLobby, SavePlayer, AddPlayer, DeletePlayer, RemovePlayer, FetchLobbies } from '../actions';

const Receiver = Effect;
const Sender = Effect({ dispatch: false });

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
        private sockets$: LiveLobbyService,
    ) { }

    @Sender
    sendMessage = this.actions$.pipe(
        ofType<SendMessage>(LobbyActionTypes.SEND_MESSAGE),
        map(action => this.sockets$.sendMessage(action)),
    );
    @Receiver()
    onMessageReceive = this.sockets$.pipe(
        ofType<AddMessage>(LobbyActionTypes.ADD_MESSAGE),
        map(action => {
            return new AddMessage(action.payload);
        })
    );


    @Sender
    fetchLobbies = this.actions$.pipe(
        ofType<FetchLobbies>(LobbyActionTypes.FETCH_LOBBIES),
        map(action => this.sockets$.fetchLobbies(action))
    )
    @Receiver()
    onLobbiesFetched = this.sockets$.pipe(
        ofType<AddLobbies>(LobbyActionTypes.ADD_LOBBIES),
        map(action => new AddLobbies(action.payload)),
    )


    @Sender
    createLobby = this.actions$.pipe(
        ofType<CreateLobby>(LobbyActionTypes.CREATE_LOBBY),
        map(action => this.sockets$.createLobby(action)),
    );
    @Receiver()
    onLobbyCreated = this.sockets$.pipe(
        ofType<AddLobby>(LobbyActionTypes.ADD_LOBBY),
        map(action => new AddLobby(action.payload)),
    )


    @Sender
    deleteLobby = this.actions$.pipe(
        ofType<DeleteLobby>(LobbyActionTypes.DELETE_LOBBY),
        map(action => this.sockets$.deleteLobby(action)),
    )
    @Receiver()
    onLobbyDeleted = this.sockets$.pipe(
        ofType<RemoveLobby>(LobbyActionTypes.REMOVE_LOBBY),
        map(action => [
            new RemoveLobby(action.payload),
        ]),
    )


    @Sender
    savePlayer = this.actions$.pipe(
        ofType<SavePlayer>(LobbyActionTypes.SAVE_PLAYER),
        map(action => this.sockets$.savePlayer(action))
    )
    @Receiver()
    onPlayerSaved = this.sockets$.pipe(
        ofType<AddPlayer>(LobbyActionTypes.ADD_PLAYER),
        map(action => new AddPlayer(action.payload))
    )


    @Sender
    deletePlayer = this.actions$.pipe(
        ofType<DeletePlayer>(LobbyActionTypes.DELETE_PLAYER),
        map(action => this.sockets$.deletePlayer(action))
    )
    @Receiver()
    onPlayerDeleted = this.sockets$.pipe(
        ofType<RemovePlayer>(LobbyActionTypes.REMOVE_PLAYER),
        map(action => new RemovePlayer(action.payload)),
    )
}
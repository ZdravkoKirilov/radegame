import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ActionReducerMap } from '@ngrx/store';

import { Lobby, LobbyPlayer, ChatMessage } from '../../models';
import { LobbyAction, LobbyActionTypes } from '../actions';

export type LobbyState = {
    lobbies: LobbyEntityState;
    players: PlayerEntityState;
    messages: MessageEntityState;
};

export type LobbyFeatureEntity = Lobby | LobbyPlayer | ChatMessage;

export type PlayerEntityState = EntityState<LobbyPlayer>;
export type LobbyEntityState = EntityState<Lobby>;
export type MessageEntityState = EntityState<ChatMessage>;

const selectBy = (prop: 'name' | 'title' | 'id' | 'timestamp') => (elem: LobbyFeatureEntity): string => {
    return String(elem[prop]);
};

const sortBy = (prop: 'name' | 'title' | 'id' | 'timestamp') => (a: LobbyFeatureEntity, b: LobbyFeatureEntity): number => {
    return String(a[prop]).localeCompare(b[prop]);
};

export const lobbyAdapter = createEntityAdapter<Lobby>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const playerAdapter = createEntityAdapter<LobbyPlayer>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const messageAdapter = createEntityAdapter<ChatMessage>({
    selectId: selectBy('timestamp'),
    sortComparer: sortBy('timestamp')
});

export const initialState: LobbyState = {
    lobbies: lobbyAdapter.getInitialState(),
    players: playerAdapter.getInitialState(),
    messages: messageAdapter.getInitialState(),
};

const lobbyReducer = (
    state: LobbyEntityState = initialState.lobbies,
    action: LobbyAction
): LobbyEntityState => {
    switch (action.type) {
        case LobbyActionTypes.ADD_LOBBIES:
            return lobbyAdapter.addMany(action.payload.lobbies, state);
        case LobbyActionTypes.REMOVE_LOBBY:
            return lobbyAdapter.removeOne(action.payload.name, state);
        default:
            return state;
    }
};

const playerReducer = (
    state: PlayerEntityState = initialState.players,
    action: LobbyAction): PlayerEntityState => {
    switch (action.type) {
        case LobbyActionTypes.ADD_PLAYER:
            return playerAdapter.upsertOne(action.payload, state);
        case LobbyActionTypes.REMOVE_PLAYER:
            return playerAdapter.removeOne(action.payload.playerName, state);
        case LobbyActionTypes.REMOVE_PLAYERS:
            return playerAdapter.removeMany(action.payload.playerNames, state);
        default:
            return state;
    }
};

const messageReducer = (
    state: MessageEntityState = initialState.messages,
    action: LobbyAction
): MessageEntityState => {
    switch (action.type) {
        case LobbyActionTypes.ADD_MESSAGE:
            return messageAdapter.addOne(action.payload, state);
        case LobbyActionTypes.REMOVE_MESSAGES:
            return messageAdapter.removeMany(action.payload.messageIds, state);
        default:
            return state;
    }
}

export const mainLobbyReducer: ActionReducerMap<LobbyState> = {
    lobbies: lobbyReducer,
    players: playerReducer,
    messages: messageReducer,
};
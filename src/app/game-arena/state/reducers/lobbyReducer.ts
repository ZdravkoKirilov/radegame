import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

import { Lobby, LobbyPlayer, ChatMessage } from '../../models';
import { LobbyAction, LobbyActionTypes } from '../actions';

export type LobbyState = {
    lobbies: LobbyEntityState;
    players: PlayerEntityState;
    messages: MessageEntityState;
};

type LobbyFeatureEntity = Lobby | LobbyPlayer | ChatMessage;

export type PlayerEntityState = EntityState<LobbyPlayer>;
export type LobbyEntityState = EntityState<Lobby>;
export type MessageEntityState = EntityState<ChatMessage>;

const selectBy = (prop: 'name' | 'id') => (elem: LobbyFeatureEntity): string => {
    return String(elem[prop]);
};

const sortBy = (prop: 'name' | 'id' | 'timestamp') => (a: LobbyFeatureEntity, b: LobbyFeatureEntity): number => {
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
    selectId: selectBy('id'),
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
        case LobbyActionTypes.ADD_LOBBY:
            return lobbyAdapter.addOne(action.payload.lobby, state);
        case LobbyActionTypes.REMOVE_LOBBY:
            return lobbyAdapter.removeOne(action.payload.lobby.name, state);
        default:
            return state;
    }
};

const playerReducer = (
    state: PlayerEntityState = initialState.players,
    action: LobbyAction): PlayerEntityState => {
    switch (action.type) {
        case LobbyActionTypes.ADD_PLAYER:
            return playerAdapter.upsertOne(action.payload.player, state);
        case LobbyActionTypes.ADD_LOBBIES:
            return playerAdapter.addMany(action.payload.players, state);
        case LobbyActionTypes.REMOVE_PLAYER:
            return playerAdapter.removeOne(action.payload.player.name, state);
        case LobbyActionTypes.ADD_LOBBY:
            return playerAdapter.addOne(action.payload.owner, state);
        case LobbyActionTypes.REMOVE_LOBBY:
            const playerNames = Object.values(state.entities)
                .filter(player => player.lobby === action.payload.lobby.name)
                .map(player => player.name);
            return playerAdapter.removeMany(playerNames, state);
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
            return messageAdapter.addOne(action.payload.message, state);
        case LobbyActionTypes.REMOVE_LOBBY:
            const relatedMessages = Object.values(state.entities)
                .filter(message => message.lobby === action.payload.lobby.name)
                .map(message => message.id);
            return messageAdapter.removeMany(relatedMessages, state);
        default:
            return state;
    }
}

export const mainLobbyReducer = combineReducers({
    lobbies: lobbyReducer,
    players: playerReducer,
    messages: messageReducer,
});
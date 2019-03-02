import produce from 'immer';
import { LobbyFeatureState, initialState, LobbyMetaState, GameEntityState, LobbyEntityState, PlayerEntityState, gameAdapter, lobbyAdapter, playerAdapter } from './shape';
import { LobbyAction } from './actions';
import { ActionReducerMap } from '@ngrx/store';
import { FETCH_GAME_SUCCESS, FETCH_LOBBIES_SUCCESS, FETCH_ALL_PLAYERS_SUCCESS, TOGGLE_FORM, ADD_LOBBY, REMOVE_LOBBY, ADD_PLAYER, REMOVE_PLAYER, FETCH_LOBBY_SUCCESS, FETCH_PLAYERS_SUCCESS } from './actionTypes';

const gamesReducer = (
    state: GameEntityState = initialState.games,
    action: LobbyAction): GameEntityState => {
    switch (action.type) {
        case FETCH_GAME_SUCCESS:
            return gameAdapter.upsertOne(action.payload, state);
        default:
            return state;
    }
};

const lobbyReducer = (
    state: LobbyEntityState = initialState.lobbies,
    action: LobbyAction): LobbyEntityState => {
    switch (action.type) {
        case FETCH_LOBBIES_SUCCESS:
            return lobbyAdapter.addMany(action.payload, state);
        case ADD_LOBBY:
        case FETCH_LOBBY_SUCCESS:
            return lobbyAdapter.addOne(action.payload, state);
        case REMOVE_LOBBY:
            return lobbyAdapter.removeOne(action.payload, state);
        default:
            return state;
    }
};

const playerReducer = (
    state: PlayerEntityState = initialState.players,
    action: LobbyAction): PlayerEntityState => {
    switch (action.type) {
        case FETCH_ALL_PLAYERS_SUCCESS:
            return playerAdapter.addAll(action.payload, state);
        case FETCH_PLAYERS_SUCCESS:
            return playerAdapter.addMany(action.payload, state);
        case ADD_PLAYER:
            return playerAdapter.addOne(action.payload, state);
        case REMOVE_PLAYER:
            return playerAdapter.removeOne(action.payload, state);
        default:
            return state;
    }
};

const metaReducer = (
    state: LobbyMetaState = initialState.meta,
    action: LobbyAction): LobbyMetaState => {
    switch (action.type) {
        case TOGGLE_FORM:
            return produce(state, draft => {
                draft.showForm = action.payload
            });
        default:
            return state;
    }
};

export const mainReducer: ActionReducerMap<LobbyFeatureState> = {
    meta: metaReducer,
    games: gamesReducer,
    lobbies: lobbyReducer,
    players: playerReducer,
};
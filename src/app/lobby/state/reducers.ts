import produce from 'immer';
import { LobbyFeatureState, initialState, LobbyMetaState, GameEntityState, LobbyEntityState, PlayerEntityState } from './shape';
import { LobbyAction } from './actions';
import { ActionReducerMap } from '@ngrx/store';

const gamesReducer = (
    state: GameEntityState = initialState.games,
    action: LobbyAction): GameEntityState => {
    switch (action.type) {
        default:
            return state;
    }
};

const lobbyReducer = (
    state: LobbyEntityState = initialState.lobbies,
    action: LobbyAction): LobbyEntityState => {
    switch (action.type) {
        default:
            return state;
    }
};

const playerReducer = (
    state: PlayerEntityState = initialState.players,
    action: LobbyAction): PlayerEntityState => {
    switch (action.type) {
        default:
            return state;
    }
};

const metaReducer = (
    state: LobbyMetaState = initialState.meta,
    action: LobbyAction): LobbyMetaState => {
    switch (action.type) {
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
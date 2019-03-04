import produce from 'immer';
import { LobbyFeatureState, initialState, LobbyMetaState, GameEntityState, LobbyEntityState, PlayerEntityState, gameAdapter, lobbyAdapter, playerAdapter, TeamEntityState, FactionEntityState, ImageEntityState, teamAdapter, factionAdapter, imageAdapter } from './shape';
import { LobbyAction } from './actions';
import { ActionReducerMap } from '@ngrx/store';
import { FETCH_GAME_SUCCESS, FETCH_LOBBIES_SUCCESS, FETCH_ALL_PLAYERS_SUCCESS, TOGGLE_FORM, ADD_LOBBY, REMOVE_LOBBY, SAVE_PLAYER, REMOVE_PLAYER, FETCH_LOBBY_SUCCESS, FETCH_PLAYERS_SUCCESS, FETCH_TEAMS_SUCCESS, FETCH_FACTIONS_SUCCESS, FETCH_IMAGES_SUCCESS, REMOVE_PLAYERS } from './actionTypes';

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
        case SAVE_PLAYER:
            return playerAdapter.upsertOne(action.payload, state);
        case REMOVE_PLAYER:
            return playerAdapter.removeOne(action.payload, state);
        case REMOVE_PLAYERS:
            return playerAdapter.removeMany(action.payload, state);
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

const teamReducer = (
    state: TeamEntityState = initialState.teams,
    action: LobbyAction
): TeamEntityState => {
    switch (action.type) {
        case FETCH_TEAMS_SUCCESS:
            return teamAdapter.addAll(action.payload, state);
        default:
            return state;
    }
};

const factionReducer = (
    state: FactionEntityState = initialState.factions,
    action: LobbyAction
): FactionEntityState => {
    switch (action.type) {
        case FETCH_FACTIONS_SUCCESS:
            return factionAdapter.addAll(action.payload, state);
        default:
            return state;
    }
};

const imageReducer = (
    state: ImageEntityState = initialState.images,
    action: LobbyAction
): ImageEntityState => {
    switch (action.type) {
        case FETCH_IMAGES_SUCCESS:
            return imageAdapter.addAll(action.payload, state);
        default:
            return state;
    }
};

export const mainReducer: ActionReducerMap<LobbyFeatureState> = {
    meta: metaReducer,
    games: gamesReducer,
    lobbies: lobbyReducer,
    players: playerReducer,
    teams: teamReducer,
    factions: factionReducer,
    images: imageReducer,
};
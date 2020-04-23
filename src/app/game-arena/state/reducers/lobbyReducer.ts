import produce from 'immer';

import { Lobby, LobbyPlayer, ChatMessage } from '../../models';

export type LobbyFeatureState = {
    lobbies: LobbyEntityState;
    players: PlayerEntityState;
    messages: MessageEntityState;
};

export type LobbyFeatureEntity =  Lobby | LobbyPlayer | ChatMessage;

export type PlayerEntityState = EntityState<LobbyPlayer>;
export type LobbyEntityState = EntityState<Lobby>;
export type FactionEntityState = EntityState<Faction>;
export type ImageEntityState = EntityState<ImageAsset>;
export type MessageEntityState = EntityState<ChatMessage>;
export type SetupEntityState = EntityState<Setup>;

const selectBy = (prop: 'name' | 'title' | 'id' | 'timestamp') => (elem: LobbyFeatureEntity): string => {
    return String(elem[prop]);
};

const sortBy = (prop: 'name' | 'title' | 'id' | 'timestamp') => (a: LobbyFeatureEntity, b: LobbyFeatureEntity): number => {
    return String(a[prop]).localeCompare(b[prop]);
};

export const gameAdapter = createEntityAdapter<Game>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const lobbyAdapter = createEntityAdapter<Lobby>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const playerAdapter = createEntityAdapter<LobbyPlayer>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const factionAdapter = createEntityAdapter<Faction>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const imageAdapter = createEntityAdapter<ImageAsset>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const setupAdapter = createEntityAdapter<Setup>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const messageAdapter = createEntityAdapter<ChatMessage>({
    selectId: selectBy('timestamp'),
    sortComparer: sortBy('timestamp')
});

export const initialState: LobbyFeatureState = {
    meta: {
        showForm: false,
    },
    games: gameAdapter.getInitialState(),
    lobbies: lobbyAdapter.getInitialState(),
    players: playerAdapter.getInitialState(),
    factions: factionAdapter.getInitialState(),
    images: imageAdapter.getInitialState(),
    messages: messageAdapter.getInitialState(),
    setups: setupAdapter.getInitialState(),
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

const setupReducer = (
    state: SetupEntityState = initialState.setups,
    action: LobbyAction
): SetupEntityState => {
    switch (action.type) {
        case FETCH_SETUPS_SUCCESS:
            return setupAdapter.addAll(action.payload, state);
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

const messageReducer = (
    state: MessageEntityState = initialState.messages,
    action: LobbyAction
): MessageEntityState => {
    switch (action.type) {
        case SAVE_MESSAGE:
            return messageAdapter.addOne(action.payload, state);
        default:
            return state;
    }
}

export const mainReducer: ActionReducerMap<LobbyFeatureState> = {
    meta: metaReducer,
    games: gamesReducer,
    lobbies: lobbyReducer,
    players: playerReducer,
    factions: factionReducer,
    images: imageReducer,
    messages: messageReducer,
    setups: setupReducer,
};
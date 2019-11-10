import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Game, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { Lobby, LobbyPlayer, ChatMessage } from '../models';

export type LobbyFeatureState = {
    meta: LobbyMetaState;
    games: GameEntityState;
    lobbies: LobbyEntityState;
    players: PlayerEntityState;
    factions: FactionEntityState;
    images: ImageEntityState;
    messages: MessageEntityState;
    setups: SetupEntityState;
};

export type LobbyFeatureEntity = Game | Lobby | LobbyPlayer | Faction | ImageAsset | ChatMessage;

export type LobbyMetaState = {
    showForm: boolean;
};

export type GameEntityState = EntityState<Game>;
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
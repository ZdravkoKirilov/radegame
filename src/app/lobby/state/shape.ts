import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Game } from '@app/game-mechanics';
import { Lobby, Player } from '../models';

export type LobbyFeatureState = {
    meta: LobbyMetaState;
    games: GameEntityState;
    lobbies: LobbyEntityState;
    players: PlayerEntityState;
};

export type LobbyFeatureEntity = Game | Lobby | Player;

export type LobbyMetaState = {
    showForm: boolean;
};

export type GameEntityState = EntityState<Game>;
export type PlayerEntityState = EntityState<Player>;
export type LobbyEntityState = EntityState<Lobby>;

const selectBy = (prop: 'name' | 'title' | 'id') => (elem: LobbyFeatureEntity): string => {
    return elem[prop];
};

const sortBy = (prop: 'name' | 'title' | 'id') => (a: LobbyFeatureEntity, b: LobbyFeatureEntity): number => {
    return a[prop].localeCompare(b[prop]);
};

export const gameAdapter = createEntityAdapter<Game>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const lobbyAdapter = createEntityAdapter<Lobby>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const playerAdapter = createEntityAdapter<Player>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const initialState: LobbyFeatureState = {
    meta: {
        showForm: false,
    },
    games: gameAdapter.getInitialState(),
    lobbies: lobbyAdapter.getInitialState(),
    players: playerAdapter.getInitialState(),
};
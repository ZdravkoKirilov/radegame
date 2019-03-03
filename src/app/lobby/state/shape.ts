import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Game, Team, Faction, ImageAsset } from '@app/game-mechanics';
import { Lobby, Player } from '../models';

export type LobbyFeatureState = {
    meta: LobbyMetaState;
    games: GameEntityState;
    lobbies: LobbyEntityState;
    players: PlayerEntityState;
    teams: TeamEntityState;
    factions: FactionEntityState;
    images: ImageEntityState;
};

export type LobbyFeatureEntity = Game | Lobby | Player | Team | Faction | ImageAsset;

export type LobbyMetaState = {
    showForm: boolean;
};

export type GameEntityState = EntityState<Game>;
export type PlayerEntityState = EntityState<Player>;
export type LobbyEntityState = EntityState<Lobby>;
export type TeamEntityState = EntityState<Team>;
export type FactionEntityState = EntityState<Faction>;
export type ImageEntityState = EntityState<ImageAsset>;

const selectBy = (prop: 'name' | 'title' | 'id') => (elem: LobbyFeatureEntity): string => {
    return String(elem[prop]);
};

const sortBy = (prop: 'name' | 'title' | 'id') => (a: LobbyFeatureEntity, b: LobbyFeatureEntity): number => {
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

export const playerAdapter = createEntityAdapter<Player>({
    selectId: selectBy('name'),
    sortComparer: sortBy('name'),
});

export const teamAdapter = createEntityAdapter<Team>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const factionAdapter = createEntityAdapter<Faction>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const imageAdapter = createEntityAdapter<ImageAsset>({
    selectId: selectBy('id'),
    sortComparer: sortBy('id'),
});

export const initialState: LobbyFeatureState = {
    meta: {
        showForm: false,
    },
    games: gameAdapter.getInitialState(),
    lobbies: lobbyAdapter.getInitialState(),
    players: playerAdapter.getInitialState(),
    teams: teamAdapter.getInitialState(),
    factions: factionAdapter.getInitialState(),
    images: imageAdapter.getInitialState(),
};
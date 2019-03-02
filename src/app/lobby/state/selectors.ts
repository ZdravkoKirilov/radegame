import { createFeatureSelector, createSelector } from "@ngrx/store";
import { groupBy } from 'lodash';

import { FEATURE_NAME } from "../config";
import { LobbyFeatureState, gameAdapter, lobbyAdapter, playerAdapter } from "./shape";
import { selectGameId, selectLobbyName } from "@app/shared";
import { Lobby } from "../models";

const selectFeature = createFeatureSelector<LobbyFeatureState>(FEATURE_NAME);

const selectGames = createSelector(
    selectFeature,
    feature => feature.games,
);
const selectLobbies = createSelector(
    selectFeature,
    feature => feature.lobbies
);
const selectPlayers = createSelector(
    selectFeature,
    feature => feature.players
);
const selectMeta = createSelector(
    selectFeature,
    feature => feature.meta
)

const fromGameAdapter = gameAdapter.getSelectors();
const fromLobbyAdapter = lobbyAdapter.getSelectors();
const fromPlayerAdapter = playerAdapter.getSelectors();

export const getFormState = createSelector(
    selectMeta,
    meta => meta.showForm,
);

const getGameEntities = createSelector(
    selectGames,
    fromGameAdapter.selectEntities,
);

export const getSelectedGame = createSelector(
    selectGameId,
    getGameEntities,
    (id, entities) => entities[id],
);

export const getLobbies = createSelector(
    selectLobbies,
    fromLobbyAdapter.selectAll
);

const getLobbyEntities = createSelector(
    selectLobbies,
    fromLobbyAdapter.selectEntities,
)

const getPlayers = createSelector(
    selectPlayers,
    fromPlayerAdapter.selectAll
);

const getPlayersPerLobby = createSelector(
    getPlayers,
    players => groupBy(players, 'lobby')
);

export const getLobbiesWithPlayers = createSelector(
    getLobbies,
    getPlayersPerLobby,
    (lobbies, players) => {
        return lobbies.map(elem => {
            return { ...elem, players: players[elem.name] || [] } as Lobby;
        });
    }
);

const getSelectedLobby = createSelector(
    selectLobbyName,
    getLobbyEntities,
    (name, entities) => entities[name]
);

export const getSelectedLobbyWithPlayers = createSelector(
    getSelectedLobby,
    getPlayersPerLobby,
    (lobby, players) => {
        if (lobby && players) {
            return { ...lobby, players: [...(players[lobby.name] || [])] } as Lobby;
        }
    }
)
import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { groupBy } from 'lodash';

import { FEATURE_NAME } from "../config";
import { LobbyFeatureState, gameAdapter, lobbyAdapter, playerAdapter, teamAdapter, factionAdapter, imageAdapter, LobbyMetaState, messageAdapter } from "./shape";
import { selectGameId, selectLobbyName } from "@app/shared";
import { Lobby } from "../models";
import { selectUser } from "@app/profile";

const selectFeature = createFeatureSelector<LobbyFeatureState>(FEATURE_NAME);

const selectSubfeature = (key: keyof LobbyFeatureState) => createSelector(
    selectFeature,
    feature => feature[key]
);

const fromGameAdapter = gameAdapter.getSelectors();
const fromLobbyAdapter = lobbyAdapter.getSelectors();
const fromPlayerAdapter = playerAdapter.getSelectors();
const fromTeamAdapter = teamAdapter.getSelectors();
const fromFactionAdapter = factionAdapter.getSelectors();
const fromImageAdapter = imageAdapter.getSelectors();
const fromMessageAdapter = messageAdapter.getSelectors();

export const getFormState = createSelector(
    selectSubfeature('meta'),
    (meta: LobbyMetaState) => meta.showForm,
);

const getGameEntities = createSelector(
    selectSubfeature('games'),
    fromGameAdapter.selectEntities,
);

export const getSelectedGame = createSelector(
    selectGameId,
    getGameEntities,
    (id, entities) => entities[id],
);

export const getLobbies = createSelector(
    selectSubfeature('lobbies'),
    fromLobbyAdapter.selectAll
);

const getLobbyEntities = createSelector(
    selectSubfeature('lobbies'),
    fromLobbyAdapter.selectEntities,
)

export const getPlayers = createSelector(
    selectSubfeature('players'),
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
);

export const getMessages = createSelector(
    selectSubfeature('messages'),
    fromMessageAdapter.selectAll
);

export const getImages = createSelector(
    selectSubfeature('images'),
    fromImageAdapter.selectAll
);

export const getTeams = createSelector(
    selectSubfeature('teams'),
    fromTeamAdapter.selectAll
);

export const getFactions = createSelector(
    selectSubfeature('factions'),
    fromFactionAdapter.selectAll
);

export const getSetup = createSelector(
    getSelectedGame,
    getSelectedLobby,
    (game, lobby) => {
        if (game && lobby) {
            return {}; //game.setups.find(setup => setup.id == lobby.setup);
        }
    }
);

export const playerJoined = createSelector(
    getSelectedLobbyWithPlayers,
    selectUser,
    (lobby, user) => {
        if (lobby && user) {
            return Boolean(lobby.players.find(player => player.user == user.id));
        }
        return true;
    }
);

export const isOwner = createSelector(
    getSelectedLobby,
    selectUser,
    (lobby, user) => {
        if (lobby && user) {
            return lobby.owner == user.id;
        }
        return false;
    }
);

export const getSelf = createSelector(
    selectUser,
    getPlayers,
    (user, players) => {
        if (user && players) {
            return players.find(player => player.user == user.id);
        }
    }
);
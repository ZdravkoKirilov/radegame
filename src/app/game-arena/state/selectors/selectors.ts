import { createSelector } from "reselect";
import get from "lodash/get";
import groupBy from 'lodash/groupBy';

import { Setup, CommonGameStore, Player, } from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { selectLobbyName } from "@app/shared";

import { FEATURE_NAME } from "../../config";
import { createArenaExpressionContext } from "../../helpers";
import { lobbyAdapter, playerAdapter, messageAdapter, LobbyState } from "../reducers";
import { Lobby } from "../../models";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

const selectGeneralFeature = createSelector(
  selectFeature,
  feature => feature.general
);

export const selectGameState = createSelector(
  selectFeature,
  feature => feature.state,
);

const selectLobbySubfeature = createSelector(selectFeature, feature => feature.lobby);

export const selectConfig = createSelector(
  selectGeneralFeature,
  feature => feature.config,
);

export const selectPlayers = createSelector(
  selectGeneralFeature,
  general => get(general, ['game_instance', 'players'], []) as Player[],
);

export const selectLoadedChunks = createSelector(
  selectGeneralFeature,
  feature => feature.loaded_chunks
);

const selectSetup = createSelector(
  selectGameState,
  state => state ? state.setup : null,
);

export const selectSetupData = createSelector(
  selectSetup,
  selectConfig,
  (setup, config) => config && setup ? config.setups[setup] as Setup : null,
);

const selectExpressionContext = createSelector(
  selectUser,
  selectConfig,
  selectGameState,
  selectPlayers,
  selectLoadedChunks,
  (user, conf, state, players, loaded_chunks) => {
    return createArenaExpressionContext({
      conf,
      state,
      players,
      self: players?.find(player => player.user === user.id),
      loaded_modules: loaded_chunks
    });
  }
);

export const selectCommonGameStore = createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => ({ config, context }) as CommonGameStore
);

export const selectGameInstance = createSelector(
  selectGeneralFeature,
  feature => feature.game_instance,
);

export const selectGameConfig = createSelector(
  selectGeneralFeature,
  feature => feature.config,
);

export const selectGame = createSelector(
  selectGeneralFeature,
  feature => feature.game,
);

export const isDownloadingGameData = createSelector(
  selectGameInstance,
  selectGameConfig,
  selectGame,
  (instance, config, game) => !instance || !config || !game
);

export const isDownloadingGameMenuData = createSelector(
  selectGameConfig,
  selectGame,
  (config, game) => {
    return !config || !game;
  }
);

const selectSubfeature = (key: keyof LobbyState) => createSelector(
  selectLobbySubfeature,
  feature => feature[key]
);

const fromLobbyAdapter = lobbyAdapter.getSelectors();
const fromPlayerAdapter = playerAdapter.getSelectors();
const fromMessageAdapter = messageAdapter.getSelectors();

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
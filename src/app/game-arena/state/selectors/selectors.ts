import { createSelector } from "reselect";
import get from "lodash/get";
import groupBy from 'lodash/groupBy';

import { FEATURE_NAME } from "../../config";
import { Setup, enrichNode, enrichModule, enrichWidget, enrichFrame, CommonGameStore, } from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { toDictionary, selectLobbyName } from "@app/shared";
import { StatefulComponent } from "@app/render-kit";
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
  general => get(general, ['game_instance', 'players'], []),
);

export const selectLoadedChunks = createSelector(
  selectGeneralFeature,
  feature => feature.loaded_chunks
);

export const selectModule = createSelector(
  selectGameState,
  state => state.module,
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

export const selectExpressionContext = createSelector(
  selectUser,
  selectConfig,
  selectGameState,
  selectPlayers,
  selectLoadedChunks,
  (user, conf, state, players, loaded_chunks) => {
    return createArenaExpressionContext({
      self: user.id, loaded_chunks,
      conf, state, players: toDictionary(players, 'id')
    });
  }
);

export const selectCommonGameStore = createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => ({ config, context }) as CommonGameStore
);

export const selectModuleData = createSelector(
  selectModule,
  selectConfig,
  selectExpressionContext,
  (moduleId, config, context) => {

    return enrichModule(config, context, config.modules[moduleId]);
  }
);

export const selectCurrentModuleWidget = createSelector(
  selectConfig,
  selectExpressionContext,
  selectModuleData,
  (config, context, module) => {
    return module ? enrichWidget(config, context, module.board) : null;
  }
);

export const selectCurrentModuleWidgetNodes = createSelector(
  selectConfig,
  selectExpressionContext,
  selectCurrentModuleWidget,
  (config, context, widget) => {
    const { node_getter } = widget;
    if (typeof node_getter === 'function') {
      return node_getter({
        widget: widget,
        component: {} as StatefulComponent,
      }).map(elem => enrichNode(config, context, elem));
    }
    return widget.nodes.map(elem => enrichNode(config, context, elem));
  }
);

export const selectCurrentModuleWidgetFrame = createSelector(
  selectConfig,
  selectExpressionContext,
  selectCurrentModuleWidget,
  (config, context, widget) => {
    const { frame_getter } = widget;
    if (typeof frame_getter === 'function') {
      const frame = frame_getter({ widget: widget, component: {} as StatefulComponent });
      return enrichFrame(config, context, frame);
    }
    const frame = widget.frames[0];
    return enrichFrame(config, context, frame);
  }
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
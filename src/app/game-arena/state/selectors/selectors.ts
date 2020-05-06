import { createSelector } from "reselect";
import get from "lodash/get";
import groupBy from 'lodash/groupBy';

import { FEATURE_NAME } from "../../config";
import {
  Round, Setup, Widget, RuntimeSlot, enrichSlot, enrichRound, enrichWidget,
  enrichFrame, enrichShape, Shape, enrichHandler, enrichTransition, SlotItem, enrichItem, enrichLifecycle
} from "@app/game-mechanics";
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

export const selectRound = createSelector(
  selectGameState,
  state => state.round,
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

export const selectRoundData = createSelector(
  selectRound,
  selectSetupData,
  selectConfig,
  selectExpressionContext,
  (roundSlotId, setup, config, context) => {
    const round = get(setup, 'rounds', []).find(elem => elem.id === roundSlotId);
    const roundId = round ? round.round : roundSlotId;
    const roundData = config.rounds[roundId] as Round;

    return enrichRound(config, context, roundData);
  }
);

export const selectCurrentRoundWidget = createSelector(
  selectConfig,
  selectExpressionContext,
  selectRoundData,
  (config, context, round) => {
    return round ? enrichWidget(config, context, round.board) : null;
  }
);

export const selectCurrentRoundWidgetSlots = createSelector(
  selectConfig,
  selectExpressionContext,
  selectCurrentRoundWidget,
  (config, context, widget) => {
    const { slot_getter } = widget;
    if (typeof slot_getter === 'function') {
      return slot_getter({
        widget: widget,
        component: {} as StatefulComponent,
      }).map(elem => enrichSlot(config, context, elem));
    }
    return widget.slots.map(elem => enrichSlot(config, context, elem));
  }
);

export const selectCurrentRoundWidgetFrame = createSelector(
  selectConfig,
  selectExpressionContext,
  selectCurrentRoundWidget,
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

export const selectSlotHandlers = (slot: RuntimeSlot) => createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => {
    return slot.handlers.map(slot => enrichHandler(config, context, slot));
  }
);

export const selectSlotLifecycles = (slot: RuntimeSlot) => createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => {
    return slot.lifecycles.map(slot => enrichLifecycle(config, context, slot));
  }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
  selectConfig,
  selectExpressionContext,
  (entities, context) => {
    return enrichShape(entities, context, shape);
  }
);

export const selectRuntimeWidget = (widget: Widget) => createSelector(
  selectConfig,
  selectExpressionContext,
  (entities, context) => {
    return enrichWidget(entities, context, widget);
  }
);

export const selectSlotTransitions = (slot: RuntimeSlot) => createSelector(
  selectExpressionContext,
  context => {
    return slot.transitions.map(transitionId => enrichTransition(context.conf, context, context.conf.transitions[transitionId]))
  },
);

export const selectItemTemplate = (item: SlotItem) => createSelector(
  selectExpressionContext,
  context => {
    const runtimeItem = enrichItem(context.conf, context, item);
    const attachedEntity = runtimeItem.choice || runtimeItem.token;
    const widget: Widget = attachedEntity.template;
    return enrichWidget(context.conf, context, widget);
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
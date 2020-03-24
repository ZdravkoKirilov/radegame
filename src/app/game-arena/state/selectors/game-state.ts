import { createSelector } from "reselect";
import get from "lodash/get";

import { FEATURE_NAME } from "../../config";
import {
    Round, Setup, Stage, RuntimeSlot, enrichSlot, createExpressionContext, enrichRound, enrichStage,
    enrichFrame, enrichShape, Shape, RuntimeText, enrichText, enrichHandler, enrichTransition
} from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary } from "@app/shared";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

export const selectConfig = createSelector(
    selectFeature,
    feature => feature.config,
);

const selectLoadedChunks = createSelector(
    selectFeature,
    feature => feature.loaded_chunks
);

export const selectGameState = createSelector(
    selectFeature,
    feature => feature.state,
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
        return createExpressionContext({
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

export const selectCurrentRoundStage = createSelector(
    selectConfig,
    selectExpressionContext,
    selectRoundData,
    (config, context, round) => {
        return enrichStage(config, context, round.board);
    }
);

export const selectCurrentRoundStageSlots = createSelector(
    selectConfig,
    selectExpressionContext,
    selectCurrentRoundStage,
    (config, context, stage) => {
        const { slot_getter } = stage;
        if (typeof slot_getter === 'function') {
            return slot_getter(stage).map(elem => enrichSlot(config, context, elem));
        }
        return stage.slots.map(elem => enrichSlot(config, context, elem));
    }
);

export const selectCurrentRoundStageFrame = createSelector(
    selectConfig,
    selectExpressionContext,
    selectCurrentRoundStage,
    (config, context, stage) => {
        const { frame_getter } = stage;
        if (typeof frame_getter === 'function') {
            const frame = frame_getter(stage);
            return enrichFrame(config, context, frame);
        }
        const frame = stage.frames[0];
        return enrichFrame(config, context, frame);
    }
);

export const selectSlotStyle = (slot_data: RuntimeSlot) => {
    if (slot_data.style) {
        const style = slot_data.style(slot_data);
        return style;
    }
    return slot_data.style_inline;
};

export const selectSlotHandlers = (slot: RuntimeSlot) => createSelector(
    selectConfig,
    selectExpressionContext,
    (config, context) => {
        return slot.handlers.map(slot => enrichHandler(config, context, slot));
    }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
    selectConfig,
    selectExpressionContext,
    (entities, context) => {
        return enrichShape(entities, context, shape);
    }
);

export const selectRuntimeStage = (stage: Stage) => createSelector(
    selectConfig,
    selectExpressionContext,
    (entities, context) => {
        return enrichStage(entities, context, stage);
    }
);

export const selectStageSlots = (stage: Stage) => createSelector(
    selectRuntimeStage(stage),
    selectConfig,
    selectExpressionContext,
    (runtimeStage, entities, context) => {
        const { slot_getter } = runtimeStage;
        if (typeof slot_getter === 'function') {
            return slot_getter(runtimeStage).map(elem => enrichSlot(entities, context, elem));
        }
        return runtimeStage.slots.map(elem => enrichSlot(entities, context, elem));
    }
);

export const selectSlotTransitions = (slot: RuntimeSlot) => createSelector(
    selectExpressionContext,
    context => {
        return slot.transitions.map(transitionId => enrichTransition(context.conf, context, context.conf.transitions[transitionId]))
    },
);

export const selectStageFrame = (stage: Stage) => createSelector(
    selectRuntimeStage(stage),
    selectConfig,
    selectExpressionContext,
    (runtimeStage, entities, context) => {
        const { frame_getter } = runtimeStage;
        if (typeof frame_getter === 'function') {
            const frame = frame_getter(runtimeStage);
            return enrichFrame(entities, context, frame);
        }
        const frame = runtimeStage.frames[0];
        return enrichFrame(entities, context, frame);
    }
);

export const selectSlotText = (slot_data: RuntimeSlot) => createSelector(
    selectConfig,
    selectExpressionContext,
    (entities, context) => {
        let runtimeText: RuntimeText = null;

        if (slot_data.display_text_inline) {
            runtimeText = enrichText(entities, context, slot_data.display_text_inline);
        }
        if (slot_data.display_text) {
            const text = slot_data.display_text(slot_data);
            runtimeText = enrichText(entities, context, text);
        }

        if (runtimeText) {
            const selectedLanguage = 2;
            const translation = runtimeText.translations.find(elem => elem.language === selectedLanguage);
            runtimeText = { ...runtimeText, computed_value: get(translation, 'value', runtimeText.default_value) };
        }
        return runtimeText;
    }
);

export const selectTurnOrder = createSelector(
    selectGameState,
    state => state.turn_order,
);

const selectActivePlayer = createSelector(
    selectGameState,
    state => state.active_player,
);

export const selectActivePlayerData = createSelector(
    selectPlayers,
    selectActivePlayer,
    (players, playerId) => players.find(player => player.id === playerId),
);

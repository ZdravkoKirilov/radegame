import { createSelector } from "reselect";
import get from "lodash/get";

import { FEATURE_NAME } from "../../config";
import {
    Round, Setup, Stage, RuntimeSlot, enrichSlot, enrichRound, enrichStage,
    enrichFrame, enrichShape, Shape, enrichHandler, enrichTransition, SlotItem, enrichItem
} from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary } from "@app/shared";
import { StatefulComponent } from "@app/render-kit";
import { createArenaExpressionContext } from "../../helpers";

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
            return slot_getter({
                stage,
                component: {} as StatefulComponent,
            }).map(elem => enrichSlot(config, context, elem));
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
            const frame = frame_getter({ stage, component: {} as StatefulComponent });
            return enrichFrame(config, context, frame);
        }
        const frame = stage.frames[0];
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
        const attachedEntity = runtimeItem.action || runtimeItem.condition || runtimeItem.choice || runtimeItem.token;
        const stage: Stage = attachedEntity.template;
        return enrichStage(context.conf, context, stage);
    }
);
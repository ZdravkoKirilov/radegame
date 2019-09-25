import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";
import { Round, Phase, Setup, Stage, ImageAsset, Slot, getAllImageAssets, Style, createExpressionContext, Expression, evaluate, EntityState } from "@app/game-mechanics";
import { selectUser } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary, removeEmptyProps } from "@app/shared";

const selectFeature = createFeatureSelector<ArenaState>(FEATURE_NAME);
const selectConfig = createSelector(
    selectFeature,
    feature => feature.config,
);
export const selectGameState = createSelector(
    selectFeature,
    feature => feature.state,
);

export const selectRound = createSelector(
    selectGameState,
    state => state.round,
);
const selectPhase = createSelector(
    selectGameState,
    state => state.phase
);
const selectSetup = createSelector(
    selectGameState,
    state => state ? state.setup : null,
);

export const selectPhaseData = createSelector(
    selectPhase,
    selectConfig,
    (phase, config) => config.phases[phase] as Phase,
);

export const selectSetupData = createSelector(
    selectSetup,
    selectConfig,
    (setup, config) => config && setup ? config.setups[setup] as Setup : null,
);

export const selectRoundData = createSelector(
    selectRound,
    selectSetupData,
    selectConfig,
    (roundSlotId, setup, config) => {
        const roundId = setup.rounds.find(elem => elem.id === roundSlotId).round;
        const roundData = config.rounds[roundId];
        return roundData as Round;
    }
);

export const selectCurrentRoundStage = createSelector(
    selectRoundData,
    selectConfig,
    (round, config) => {
        return config.stages[round.board] as Stage;
    }
);

export const selectCurrentRoundStageImage = createSelector(
    selectCurrentRoundStage,
    selectConfig,
    (stage, config) => config.images[stage.image] as ImageAsset
);

export const selectCurrentRoundStageSlots = createSelector(
    selectCurrentRoundStage,
    selectConfig,
    (stage, config) => {
        return Object.values(config.slots).filter((slot: Slot) => slot.owner === stage.id) as Slot[];
    }
);

export const selectImageAssets = createSelector(
    selectSetup,
    selectConfig,
    (setup_id, config) => {
        const result = getAllImageAssets(setup_id, config);
        return new Set(result);
    }
);

export const selectSlotStyle = (slot_id: number) => createSelector(
    selectConfig,
    selectExpressionContext,
    (config, context) => {
        const slot_data = config.slots[slot_id] as Slot;
        let style = config.styles[slot_data.style] as Style;
        if (slot_data.state) {
            const expression = config.expressions[slot_data.state] as Expression;
            const callback = evaluate(expression.code, context);
            const state: EntityState = callback(slot_data);
            if (state && state.style) {
                const stateStyle = removeEmptyProps(config.styles[state.style]);
                style = { ...style, ...stateStyle };
            }
        }
        return style;
    }
);

export const selectSlotImage = (slot_id: number) => createSelector(
    selectConfig,
    (config) => {
        const slot_data = config.slots[slot_id] as Slot;
        const image_data = config.images[slot_data.image] || {};
        return image_data as ImageAsset;
    }
);

export const selectExpressionContext = createSelector(
    selectUser,
    selectConfig,
    selectGameState,
    selectPlayers,
    (user, conf, state, players) => {
        return createExpressionContext({
            self: user.id,
            conf, state, players: toDictionary(players, 'id'),
        });
    }
);

export const selectTurnOrder = createSelector(
    selectGameState,
    state => state.turn_order,
);

export const selectActivePlayer = createSelector(
    selectGameState,
    state => state.active_player,
);

export const selectRounds = createSelector(
    selectSetupData,
    setup => setup.rounds.map(round => round.id),
);
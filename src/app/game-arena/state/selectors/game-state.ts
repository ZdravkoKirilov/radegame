import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";
import { Round, Phase, Setup, Stage, ImageAsset, Slot, getAllImageAssets, Style } from "@app/game-mechanics";

const selectFeature = createFeatureSelector<ArenaState>(FEATURE_NAME);
const selectConfig = createSelector(
    selectFeature,
    feature => feature.config,
);
export const selectGameState = createSelector(
    selectFeature,
    feature => feature.state,
);

const selectRound = createSelector(
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
    (config) => {
        const slot_data = config.slots[slot_id] as Slot;
        const style = config.styles[slot_data.style] as Style;
        return style;
    }
);

export const selectSlotImage = (slot_id: number) => createSelector(
    selectConfig,
    config => {
        const slot_data = config.slots[slot_id] as Slot;
        const image_data = config.images[slot_data.image] as ImageAsset;
        return image_data;
    }
);
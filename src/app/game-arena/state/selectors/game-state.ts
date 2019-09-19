import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";
import { Round, Phase, Setup } from "@app/game-mechanics";

const selectFeature = createFeatureSelector<ArenaState>(FEATURE_NAME);
const selectConfig = createSelector(
    selectFeature,
    feature => feature.config,
);
const selectState = createSelector(
    selectFeature,
    feature => feature.state,
);

const selectRound = createSelector(
    selectState,
    state => state.round,
);
const selectPhase = createSelector(
    selectState,
    state => state.phase
);
const selectSetup = createSelector(
    selectState,
    state => state.setup,
);

export const selectRoundData = createSelector(
    selectRound,
    selectConfig,
    (round, config) => config.rounds[round] as Round,
);

export const selectPhaseData = createSelector(
    selectPhase,
    selectConfig,
    (phase, config) => config.phases[phase] as Phase,
);

export const selectSetupData = createSelector(
    selectSetup,
    selectConfig,
    (setup, config) => config.setups[setup] as Setup,
);

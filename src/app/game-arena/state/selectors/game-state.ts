import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";
import { Round, Phase, Setup, Stage, ImageAsset, Slot, getAllImageAssets, Style, createExpressionContext, Expression, parseFromString, EntityState, Animation, Transition, AnimationStep } from "@app/game-mechanics";
import { selectUser } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary, removeEmptyProps } from "@app/shared";
import { removeNonAnimatableProps } from "@app/render-kit";

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
        return Object.values(config.slots)
            .filter((slot: Slot) => slot.owner === stage.id)
            .map((elem: Slot) => {
                elem = { ...elem, style: config.styles[elem.style as number] } as Slot;
                return elem;
            }) as Slot[];
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

export const selectSlotData = (slot_id: number) => createSelector(
    selectConfig,
    (config) => {
        const slot = config.slots[slot_id] as Slot;
        const slot_data = {
            ...slot,
            enabled: config.expressions[slot.enabled as number]
        } as Slot;
        return slot_data;
    }
);

export const selectSlotState = (slot_id: number) => createSelector(
    selectConfig,
    selectExpressionContext,
    selectSlotData(slot_id),
    (config, context, slot_data) => {
        if (slot_data.state) {
            const expression = config.expressions[slot_data.state] as Expression;
            const callback = parseFromString(expression.code, context);
            const state: EntityState = callback(slot_data);
            return state;
        }
        return null;
    }
);

export const selectSlotStyle = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    selectSlotState(slot_id),
    (config, slot_data, state) => {
        let style = config.styles[slot_data.style] as Style;
        if (state && state.style) {
            const stateStyle = removeEmptyProps(config.styles[state.style]);
            style = { ...style, ...stateStyle };
        }
        return style;
    }
);

export const selectSlotAnimation = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotState(slot_id),
    (config, state) => {
        if (state && state.animation) {
            let animation = { ...config.animations[state.animation] } as Animation;
            animation.steps = animation.steps.map(step => {
                const from_style = config.styles[step.from_style as number] as Style;
                const to_style = config.styles[step.to_style as number] as Style;

                step = {
                    ...step,
                    from_style: removeNonAnimatableProps(from_style),
                    to_style: removeNonAnimatableProps(to_style),
                };
                return step;
            });
            return animation;
        };
        return null;
    }
);

export const selectSlotTransitions = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    selectExpressionContext,
    (config, data, context) => {
        return (data.transitions as number[]).map(id => {
            const originalTransition = config.transitions[id] as Transition;
            const originalAnimation = config.animations[originalTransition.animation as number] as Animation;

            let transition = {
                ...originalTransition,
                animation: {
                    ...originalAnimation,
                    steps: originalAnimation.steps.map(step => {
                        return {
                            ...step,
                            from_style: removeNonAnimatableProps(config.styles[step.from_style as number]),
                            to_style: removeNonAnimatableProps(config.styles[step.to_style as number]),
                        } as AnimationStep;
                    }),
                }
            } as Transition;

            if (transition.enabled) {
                let expression: Expression = { ...config.expressions[transition.enabled as number] };
                transition.enabled = expression;
            }
            return transition;
        }) as Transition[];
    }
);

export const isSlotEnabled = (slot_id: number) => createSelector(
    selectSlotData(slot_id),
    selectExpressionContext,
    (slot, context) => {
        if (slot.enabled) {
            const enabled = slot.enabled as Expression;
            const callback: Function = parseFromString(enabled.code, context);
            const result = callback.call(context, slot);
            return result as boolean;
        }
        return true;
    }
);

export const selectSlotImage = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
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

export const selectActivePlayerData = createSelector(
    selectPlayers,
    selectActivePlayer,
    (players, playerId) => players.find(player => player.id === playerId),
);

export const selectRounds = createSelector(
    selectSetupData,
    setup => setup.rounds.map(round => round.id),
);
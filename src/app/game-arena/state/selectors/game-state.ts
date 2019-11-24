import { createSelector } from "reselect";

import { FEATURE_NAME } from "../../config";
import { Round, Phase, Setup, Stage, ImageAsset, Slot, getAllImageAssets, Style, createExpressionContext, Expression, parseFromString, Animation, Transition, AnimationStep, Text, Shape, enrichEntity, ImageFrame } from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary, removeEmptyProps } from "@app/shared";
import { removeNonAnimatableProps } from "@app/render-kit";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

export const selectConfig = createSelector(
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
        return config.stages[round.board as number] as Stage;
    }
);

export const selectCurrentRoundStageImage = createSelector(
    selectCurrentRoundStage,
    selectConfig,
    (stage, config) => config.images[stage.image as number] as ImageAsset
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
        const slot = enrichEntity<Slot>(config, {
            enabled: 'expressions',
            style: 'styles',
            style_inline: (value: string) => JSON.parse(value),
            frames: {
                image: 'images',
                stage: 'stages',
            },
            item: (value: string) => JSON.parse(value),
        }, config.slots[slot_id] as Slot);
        return slot;
    }
);

export const selectSlotStyle = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
        let style = config.styles[slot_data.style as number] as Style;
        return style;
    }
);

export const selectSlotShape = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
        if (slot_data.shape) {
            const shape = config.shapes[slot_data.shape as number] as Shape;
            return shape;
        }
        return null;
    }
);

export const selectSlotText = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
        if (slot_data.display_text) {
            const text = config.texts[slot_data.display_text as number] as Text;
            return text;
        }
        return null;
    }
);

export const selectSlotAnimation = (slot_id: number) => createSelector(
    selectConfig,
    (config) => {
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
        const image_data = config.images[slot_data.image as number] || {};
        return image_data as ImageAsset;
    }
);

export const selectSlotStage = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
        let stage_data = config.stages[slot_data.board as number] as Stage || {} as Stage;
        stage_data = {
            ...stage_data,
            image: config.images[stage_data.image as number] as ImageAsset
        }
        return stage_data as Stage;
    }
);

export const selectSlotStageChildren = (slot_id: number) => createSelector(
    selectSlotStage(slot_id),
    selectConfig,
    (stage, config) => {
        return Object.values(config.slots).filter((elem: Slot) => elem.owner === stage.id) as Slot[];
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

export const selectStageChildren = (stage_id: number) => createSelector(
    selectConfig,
    (conf) => {
        return Object.values(conf.slots).filter((elem: Slot) => elem.owner === stage_id) as Slot[];
    }
);

export const selectFullStageData = (stage: Stage) => createSelector(
    selectConfig,
    config => {
        return enrichEntity(config, {
            'image': 'images'
        }, stage);
    }
);

export const selectSlotDefaultFrame = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (entities, slot_data) => {
        return enrichEntity<ImageFrame>(entities, {
            image: 'images',
            stage: 'stages',
            style: 'styles',
            style_inline: (value: string) => JSON.parse(value || '{}'),
        }, slot_data.frames[0]);
    }
);

export const selectSlotItemDefaultFrame = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
        const item = enrichEntity(config, {
            token: 'tokens',
            action: 'actions',
            condition: 'conditions',
            choice: 'choices'
        }, slot_data.item);

        if (item) {
            return enrichEntity<ImageFrame>(config, {
                image: 'images',
                stage: 'stages',
                style: 'styles',
                style_inline: (value: string) => JSON.parse(value || '{}'),
            }, item.token.frames[0]);
        }
        return null;
    }
);
import { createSelector } from "reselect";

import { FEATURE_NAME } from "../../config";
import {
    Round, Phase, Setup, Stage, ImageAsset, Slot, getAllImageAssets, createExpressionContext, Shape, enrichEntity, ImageFrame, parseFromString, parseAndBind, RuntimeSlot, RuntimeImageFrame, enrichSlot
} from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary, safeJSON } from "@app/shared";

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

export const selectCurrentRoundStageSlots = createSelector(
    selectCurrentRoundStage,
    selectConfig,
    selectExpressionContext,
    (stage, config, context) => {
        return Object.values(config.slots)
            .filter((slot: Slot) => slot.owner === stage.id)
            .map((elem: Slot) => {
                return enrichSlot(config, context, elem);   
            });
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
    selectExpressionContext,
    (config, context) => {
        return enrichSlot(config, context, config.slots[slot_id]);
    }
);

export const selectSlotStyle = (slot_id: number) => createSelector(
    selectSlotData(slot_id),
    (slot_data) => {
        if (slot_data) {
            const dynamicStyle = slot_data.style ? slot_data.style(slot_data) : {};
            const inlineStyle = safeJSON(slot_data.style_inline, {});
            const style = { ...inlineStyle, ...dynamicStyle };
            return style;
        }
        return null;
    }
);

export const selectSlotShape = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (entities, slot_data) => {
        const shape = enrichEntity<Shape>(entities, {
            style_inline: (value: string) => JSON.parse(value || '{}'),
            style: 'styles'
        }, entities.shapes[slot_data.shape as number] as Shape);
        return shape;
    }
);

export const selectSlotText = (slot_id: number) => createSelector(
    selectSlotData(slot_id),
    (slot_data) => {
        if (slot_data.display_text) {
            const text = slot_data.display_text(slot_data);
            return text;
        }
        return null;
    }
);

export const selectSlotTransitions = (slot_id: number) => createSelector(
    selectSlotData(slot_id),
    slot => {
        return slot.transitions;
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
        return Object.values(config.slots).filter((elem: Slot) => elem.owner === stage.id) as RuntimeSlot[];
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
        return Object.values(conf.slots).filter((elem: Slot) => elem.owner === stage_id) as RuntimeSlot[];
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
    selectExpressionContext,
    (entities, slot_data, context) => {
        return enrichEntity<ImageFrame>(entities, {
            image: 'images',
            stage: 'stages',
            style: (value: string) => parseAndBind(context)(value),
            style_inline: (value: string) => safeJSON(value, {}),
        }, slot_data.frames[0]) as RuntimeImageFrame;
    }
);

export const selectSlotItemDefaultFrame = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    selectExpressionContext,
    (config, slot_data, context) => {
        const item = slot_data.item;
        if (item) {
            return enrichEntity<ImageFrame>(config, {
                image: 'images',
                stage: 'stages',
                style: (value: string) => parseAndBind(context)(value),
                style_inline: (value: string) => safeJSON(value, {}),
            }, item.token.frames[0]) as RuntimeImageFrame;
        }
        return null;
    }
);
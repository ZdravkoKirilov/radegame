import { createSelector } from "reselect";
import get from "lodash/get";

import { FEATURE_NAME } from "../../config";
import {
    Round, Setup, Stage, ImageAsset,
    createExpressionContext, enrichEntity, ImageFrame,
    parseAndBind, RuntimeSlot, RuntimeImageFrame, enrichSlot, RuntimeRound, RuntimeStage, RuntimeShape
} from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";
import { selectPlayers } from "./general";
import { toDictionary, safeJSON } from "@app/shared";

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

        return enrichEntity<Round, RuntimeRound>(config, {
            board: stageId => enrichEntity<Stage, RuntimeStage>(config, {
                slots: slot => enrichSlot(config, context, slot),
            }, config.stages[stageId] as Stage),
            loader: stageId => enrichEntity<Stage>(config, {
            }, config.stages[stageId] as Stage),
            preload: src => parseAndBind(context)(src),
            load_done: src => parseAndBind(context)(src),
        }, roundData);
    }
);

export const selectCurrentRoundStage = createSelector(
    selectRoundData,
    (round) => {
        return round.board
    }
);

export const selectCurrentRoundStageImage = createSelector(
    selectCurrentRoundStage,
    stage => null,
);

export const selectCurrentRoundStageSlots = createSelector(
    selectCurrentRoundStage,
    stage => stage.slots
);

export const selectSlotData = (slot_id: number) => createSelector(
    selectConfig,
    selectExpressionContext,
    (config, context) => {
        return enrichSlot(config, context, {});
    }
);

export const selectSlotStyle = (slot: RuntimeSlot) => {
    if (slot) {
        const dynamicStyle = slot.style ? slot.style(slot) : {};
        const inlineStyle = safeJSON(slot.style_inline, {});
        const style = { ...inlineStyle, ...dynamicStyle };
        return style;
    }
    return null;
};

export const selectSlotShape = (slot: RuntimeSlot) => slot.shape as RuntimeShape;

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

export const selectSlotTransitions = (slot: RuntimeSlot) => slot.transitions;

export const selectSlotStage = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    (config, slot_data) => {
        let stage_data = config.stages[slot_data.board as number] as Stage || {} as Stage;
        stage_data = {
            ...stage_data,
        }
        return stage_data as Stage;
    }
);

export const selectSlotStageChildren = (slot_id: number) => createSelector(
    selectSlotStage(slot_id),
    selectConfig,
    (stage, config) => {
        return stage.slots as RuntimeSlot[];
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
        return [];
    }
);

export const selectFullStageData = (stage: Stage) => createSelector(
    selectConfig,
    config => {
        return enrichEntity(config, {

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
        }, {}) as RuntimeImageFrame;
    }
);

export const selectSlotItemDefaultFrame = (slot_id: number) => createSelector(
    selectConfig,
    selectSlotData(slot_id),
    selectExpressionContext,
    (config, slot_data, context) => {
        const item = slot_data.item;
        if (item) {
            // return enrichEntity<ImageFrame>(config, {
            //     image: 'images',
            //     stage: 'stages',
            //     style: (value: string) => parseAndBind(context)(value),
            //     style_inline: (value: string) => safeJSON(value, {}),
            // }, item.token.frames[0]) as RuntimeImageFrame;
        }
        return null;
    }
);
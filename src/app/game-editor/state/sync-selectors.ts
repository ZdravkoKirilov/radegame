import { createSelector } from "reselect";
import get from 'lodash/get';

import {
    Stage, GameTemplate, enrichEntity, ImageFrame, parseAndBind, RuntimeImageFrame,
    enrichSlot, RuntimeStage, RuntimeSlot, Shape, RuntimeShape, RuntimeText, Text, createExpressionContext
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../utils";
import { safeJSON } from "@app/shared";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

const selectForm = createSelector(
    selectFeature,
    feature => feature.form,
);

const selectEntitiesDictionary = createSelector(
    selectForm,
    form => {
        const result = {} as GameTemplate;
        for (let key in form) {
            result[key] = form[key].items;
        }
        return result;
    }
)

const selectExpressionContext = createSelector(
    selectForm,
    form => {
        const conf = Object.entries(form).reduce((total, [key, value]) => {
            total[key] = value.items;
            return total;
        }, {}) as GameTemplate;
        return createExpressionContext({ conf, self: 1, players: {}, state: {} as any, loaded_chunks: [] });
    }
);

export const selectRuntimeStage = (stage: Stage) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        const result = enrichEntity<Stage, RuntimeStage>(entities, {
            slots: slot => enrichSlot(entities, context, slot),
            slot_getter: src => parseAndBind(context)(src),
            frame_getter: src => parseAndBind(context)(src),
            frames: frame => enrichEntity<ImageFrame, RuntimeImageFrame>(entities, {
                stage: 'stages',
                style: src => parseAndBind(context)(src),
            }, frame),
        }, stage);
        return result;
    }
);

export const selectStageSlots = (stage: Stage) => createSelector(
    selectRuntimeStage(stage),
    selectEntitiesDictionary,
    selectExpressionContext,
    (runtimeStage, entities, context) => {
        const { slot_getter } = runtimeStage;
        if (typeof slot_getter === 'function') {
            return slot_getter(runtimeStage).map(elem => enrichSlot(entities, context, elem));
        }
        return runtimeStage.slots.map(elem => enrichSlot(entities, context, elem));
    }
);

export const selectStageFrame = (stage: Stage) => createSelector(
    selectRuntimeStage(stage),
    selectEntitiesDictionary,
    selectExpressionContext,
    (runtimeStage, entities, context) => {
        const { frame_getter } = runtimeStage;
        if (typeof frame_getter === 'function') {
            const frame = frame_getter(runtimeStage);
            return enrichEntity<ImageFrame, RuntimeImageFrame>(entities, {
                stage: 'stages',
                style: src => parseAndBind(context)(src)
            }, frame);
        }
        const frame = runtimeStage.frames[0];
        return enrichEntity<ImageFrame, RuntimeImageFrame>(entities, {
            stage: 'stages',
            style: src => parseAndBind(context)(src)
        }, frame);
    }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        return enrichEntity<Shape, RuntimeShape>(entities, {
            style: src => parseAndBind(context)(src),
            style_inline: src => safeJSON(src, {}),
        }, shape);
    }
);

export const selectSlotStyle = (slot_data: RuntimeSlot) => {
    if (slot_data.style) {
        const style = slot_data.style(slot_data);
        return style;
    }
    return slot_data.style_inline;
};


export const selectSlotText = (slot_data: RuntimeSlot) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        let runtimeText: RuntimeText = null;
        if (slot_data.display_text) {
            const text = slot_data.display_text(slot_data);
            runtimeText = {
                ...enrichEntity<Text, RuntimeText>(entities, {
                    style_inline: src => safeJSON(src, {}),
                    style: src => parseAndBind(context)(src)
                }, text)
            };
        }

        if (slot_data.display_text_inline) {
            runtimeText = {
                ...enrichEntity<Text, RuntimeText>(entities, {
                    style_inline: src => safeJSON(src, {}),
                    style: src => parseAndBind(context)(src)
                }, slot_data.display_text_inline)
            };
        }

        if (runtimeText) {
            const selectedLanguage = 2;
            const translation = runtimeText.translations.find(elem => elem.language === selectedLanguage);
            runtimeText.computed_value = get(translation, 'value', runtimeText.default_value);
        }

        return runtimeText;
    }
);


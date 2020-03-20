import { createSelector } from "reselect";
import get from 'lodash/get';

import {
    Stage, GameTemplate,
    enrichSlot, RuntimeSlot, Shape, RuntimeText, createExpressionContext, enrichFrame, enrichStage, enrichShape, enrichText
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../utils";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

const selectForm = createSelector(
    selectFeature,
    feature => feature.form,
);

export const selectEntitiesDictionary = createSelector(
    selectForm,
    form => {
        const result = {} as GameTemplate;
        for (let key in form) {
            result[key] = form[key].items;
        }
        return result;
    }
)

export const selectExpressionContext = createSelector(
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
        return enrichStage(entities, context, stage);
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
            return enrichFrame(entities, context, frame);
        }
        const frame = runtimeStage.frames[0];
        return enrichFrame(entities, context, frame);
    }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        return enrichShape(entities, context, shape);
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


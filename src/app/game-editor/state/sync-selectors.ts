import { createSelector } from "reselect";

import {
    Stage, ImageAsset, Slot, Style, Text, Expression, parseFromString,
    createExpressionContext, GameTemplate
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../utils";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

const selectForm = createSelector(
    selectFeature,
    feature => feature.form,
);

const selectExpressionContext = createSelector(
    selectForm,
    form => {
        const conf = Object.entries(form).reduce((total, [key, value]) => {
            total[key] = value.items;
            return total;
        }, {}) as GameTemplate;
        return createExpressionContext({ conf, self: 1, players: {}, state: {} as any });
    }
);

export const selectSlotData = (slot_id: number) => createSelector(
    selectForm,
    (form) => {
        const slot = form.slots.items[slot_id] as Slot;
        const slot_data = {
            ...slot,
            enabled: form.expressions.items[slot.enabled as number]
        } as Slot;
        return slot_data;
    }
);

export const selectSlotStyle = (slot_id: number) => createSelector(
    selectForm,
    selectSlotData(slot_id),
    (form, slot_data) => {
        let style = form.styles.items[slot_data.style] as Style;
        return style;
    }
);

export const selectSlotText = (slot_id: number) => createSelector(
    selectForm,
    selectExpressionContext,
    selectSlotData(slot_id),
    (form, context, slot_data) => {
        if (slot_data.display_text) {
            const expression = form.expressions.items[slot_data.display_text as number] as Expression;
            const callback = parseFromString(expression.code, context);
            const text = callback.call(context, slot_data) as Text;
            return text;
        }
        return null;
    }
);

export const selectSlotImage = (slot_id: number) => createSelector(
    selectForm,
    selectSlotData(slot_id),
    (form, slot_data) => {
        const image_data = form.images.items[slot_data.image] || {};
        return image_data as ImageAsset;
    }
);

export const selectSlotStage = (slot_id: number) => createSelector(
    selectForm,
    selectSlotData(slot_id),
    (form, slot_data) => {
        let stage_data = form.stages.items[slot_data.board] as Stage || {} as Stage;
        stage_data = {
            ...stage_data,
            image: form.images.items[stage_data.image as number] as ImageAsset
        }
        return stage_data as Stage;
    }
);

export const selectSlotStageChildren = (slot_id: number) => createSelector(
    selectSlotStage(slot_id),
    selectForm,
    (stage, form) => {
        return Object.values(form.slots.items).filter((elem: Slot) => elem.owner === stage.id) as Slot[];
    }
);
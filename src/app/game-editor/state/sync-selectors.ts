import { createSelector } from "reselect";

import {
    Stage, ImageAsset, Slot, Text, Expression, parseFromString,
    createExpressionContext, GameTemplate, Shape, enrichEntity, ImageFrame, RuntimeSlot, parseAndBind, RuntimeImageFrame, enrichSlot
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
        return createExpressionContext({ conf, self: 1, players: {}, state: {} as any });
    }
);

export const selectSlotData = (slot_id: number) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        return enrichSlot(entities, context, entities.slots[slot_id]);
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
    selectEntitiesDictionary,
    selectSlotData(slot_id),
    (entities, slot_data) => {
        const shape = enrichEntity<Shape>(entities, {
            style_inline: (value: string) => JSON.parse(value || '{}'),
            style: 'styles'
        }, entities.shapes[slot_data.shape as number] as Shape);
        return shape;
    }
);

export const selectSlotDefaultFrame = (slot_id: number) => createSelector(
    selectEntitiesDictionary,
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
    selectEntitiesDictionary,
    selectSlotData(slot_id),
    selectExpressionContext,
    (entities, slot_data, context) => {
        const item = slot_data.item;
        // if (item) {
        //     return enrichEntity<ImageFrame>(entities, {
        //         image: 'images',
        //         stage: 'stages',
        //         style: (value: string) => parseAndBind(context)(value),
        //         style_inline: (value: string) => safeJSON(value, {}),
        //     }, item.token.frames[0]) as RuntimeImageFrame;
        // }
        return null;
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

export const selectSlotStage = (slot_id: number) => createSelector(
    selectForm,
    selectSlotData(slot_id),
    (form, slot_data) => {
        let stage_data = form.stages.items[slot_data.board as number] as Stage || {} as Stage;
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
        return Object.values(form.slots.items).filter((elem: Slot) => elem.owner === stage.id) as RuntimeSlot[];
    }
);

export const selectStageChildren = (stage_id: number) => createSelector(
    selectForm,
    (form) => {
        return Object.values(form.slots.items).filter((elem: Slot) => elem.owner === stage_id) as RuntimeSlot[];
    }
);

export const selectFullStageData = (stage: Stage) => createSelector(
    selectEntitiesDictionary,
    entities => {
        return enrichEntity(entities, {
            'image': 'images'
        }, stage);
    }
);
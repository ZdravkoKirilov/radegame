import { createSelector } from "reselect";

import {
    Stage, ImageAsset, Slot, Text, Expression, parseFromString,
    createExpressionContext, GameTemplate, Shape, enrichEntity, ImageFrame
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../utils";

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
    (entities) => {
        const slot = enrichEntity<Slot>(entities, {
            enabled: 'expressions',
            style: 'styles',
            style_inline: (value: string) => JSON.parse(value),
            frames: {
                image: 'images',
                stage: 'stages',
            },
            item: (value: string) => JSON.parse(value),
        }, entities.slots[slot_id] as Slot);
        return slot;
    }
);

export const selectSlotStyle = (slot_id: number) => createSelector(
    selectSlotData(slot_id),
    (slot_data) => {
        if (slot_data) {
            const style = { ...slot_data.style, ...slot_data.style_inline };
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
    selectEntitiesDictionary,
    selectSlotData(slot_id),
    (entities, slot_data) => {
        const item = enrichEntity(entities, {
            token: 'tokens',
            action: 'actions',
            condition: 'conditions',
            choice: 'choices'
        }, slot_data.item);

        if (item) {
            return enrichEntity<ImageFrame>(entities, {
                image: 'images',
                stage: 'stages',
                style: 'styles',
                style_inline: (value: string) => JSON.parse(value || '{}'),
            }, item.token.frames[0]);
        }
        return null;
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
        const image_data = form.images.items[slot_data.image as number] || {};
        return image_data as ImageAsset;
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
        return Object.values(form.slots.items).filter((elem: Slot) => elem.owner === stage.id) as Slot[];
    }
);

export const selectStageChildren = (stage_id: number) => createSelector(
    selectForm,
    (form) => {
        return Object.values(form.slots.items).filter((elem: Slot) => elem.owner === stage_id) as Slot[];
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
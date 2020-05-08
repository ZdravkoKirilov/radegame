import { createSelector } from "reselect";

import {
    Widget, GameTemplate, Shape, enrichWidget, enrichShape, NodeItem, enrichItem
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../utils";
import { createEditorExpressionContext } from "./initializers";

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
        return createEditorExpressionContext({ conf, self: 1, players: {}, state: {} as any, loaded_chunks: [] });
    }
);

export const selectRuntimeWidget = (widget: Widget) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        return enrichWidget(entities, context, widget);
    }
);

export const selectItemTemplate = (item: NodeItem) => createSelector(
    selectExpressionContext,
    context => {
        const runtimeItem = enrichItem(context.conf, context, item);
        const attachedEntity = runtimeItem.choice || runtimeItem.token;
        const widget: Widget = attachedEntity.template;
        return enrichWidget(context.conf, context, widget);
    }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (entities, context) => {
        return enrichShape(entities, context, shape);
    }
);


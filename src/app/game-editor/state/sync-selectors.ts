import { createSelector } from "reselect";

import {
    GameTemplate, CommonGameStore,
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../utils";
import { createEditorExpressionContext } from "./initializers";

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

export const selectCommonGameStore = createSelector(
    selectEntitiesDictionary,
    selectExpressionContext,
    (config, context) => ({ config, context, remove_transitions: true, remove_lifecycles: true, remove_handlers: true }) as CommonGameStore
);


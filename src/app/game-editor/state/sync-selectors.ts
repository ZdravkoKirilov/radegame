import { createSelector } from "reselect";

import {
  CommonGameStore, GameState,
} from "@app/game-mechanics";
import { AppState } from "@app/core";

import { FEATURE_NAME } from "../utils";
import { createEditorExpressionContext, createSandboxExpressionContext } from "./initializers";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

const selectForm = createSelector(
  selectFeature,
  feature => feature.form,
);

const selectContextOverrides = createSelector(
  selectFeature,
  feature => feature.context_overrides,
);

const selectEntitiesDictionary = createSelector(
  selectForm,
  (form: any) => {
    const result = {} as any;
    for (let key in form) {
      result[key] = form[key].items;
    }
    return result;
  }
)

export const selectExpressionContext = createSelector(
  selectEntitiesDictionary,
  config => {
    return createEditorExpressionContext({
      conf: config,
      players: [],
      self: null,
      state: null,
      loaded_modules: [],
    } as any);
  }
);

export const selectSandboxExpressionContext = createSelector(
  selectEntitiesDictionary,
  selectContextOverrides,
  (conf) => createSandboxExpressionContext({
    conf,
    players: [],
    self: null,
    state: null,
    loaded_modules: [],
  } as any)
);

export const selectCommonGameStore = createSelector(
  selectEntitiesDictionary,
  selectExpressionContext,
  (config, context) => ({ config, context }) as CommonGameStore
);

type ContextOverrides = {
  state?: Partial<GameState>;
  private_data?: {};
  other?: {};
}

export const selectCommonGameStoreWithOverrides =
  ({ state = {}, private_data = {}, other = {} }: ContextOverrides) => createSelector(
    selectEntitiesDictionary,
    selectSandboxExpressionContext,
    (config, context) => {
      return {
        config,
        context: {
          ...context,
          ...other,
          state: {
            ...(context.state || {}),
            ...state,
          },
          private_data: {
            ...(context.private_data || {}),
            ...private_data,
          }
        }
      } as CommonGameStore;
    }
  );

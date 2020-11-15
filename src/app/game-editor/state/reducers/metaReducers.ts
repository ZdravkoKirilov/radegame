import { toDictionary } from "@app/shared";
import { ActionReducer } from "@ngrx/store";

import { StoreKey } from "../../utils";
import { gameActionTypes, SetGameData } from "../actions";
import { EntityForm, StoreEntity } from "./generics";
import { GameEditorFeature } from "./main.reducer";

export function editorMetaReducer(anyReducer: ActionReducer<any>) {
  return function newReducer(state: GameEditorFeature, action: SetGameData) {

    switch (action.type) {
      case gameActionTypes.SET_GAME_DATA:
        const updatedForm = Object.keys(action.payload.data).reduce((acc, key: StoreKey) => {
          const entities: StoreEntity[] = action.payload.data[key];
          acc[key] = { byId: toDictionary(entities) };
          return acc;
        }, {} as EntityForm);

        return {
          ...state,
          form: {
            ...state.form,
            ...updatedForm
          }
        };
      default:
        return anyReducer(state, action);
    }
  };
};
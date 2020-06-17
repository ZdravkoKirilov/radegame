import { ActionReducer } from "@ngrx/store";

import { gameActionTypes, SetGameData } from "../actions";
import { GameEditorFeature } from "./main.reducer";

export function editorMetaReducer(anyReducer: ActionReducer<any>) {
  return function newReducer(state: GameEditorFeature, action: SetGameData) {

    switch (action.type) {
      case gameActionTypes.SET_GAME_DATA:
        const updatedForm = Object.keys(state.form).reduce((acc, key) => {
          const currentItems = state.form[key] ? state.form[key].items : {};
          acc[key] = { ...state.form[key], items: { ...currentItems, ...action.payload.data[key] } };
          return acc;
        }, {});

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
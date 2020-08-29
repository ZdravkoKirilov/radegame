import { ActionReducer } from "@ngrx/store";

import { gameActionTypes, SetGameData } from "../actions";
import { GameEditorFeature } from "./main.reducer";

export function editorMetaReducer(anyReducer: ActionReducer<any>) {
  return function newReducer(state: GameEditorFeature, action: SetGameData) {

    switch (action.type) {
      case gameActionTypes.SET_GAME_DATA:
        const updatedForm = Object.keys(action.payload.data).reduce((acc, key) => {
          acc[key] = { byId: action.payload.data[key] };
          return acc;
        }, {});

        return {
          ...state,
          form: {
            ...updatedForm
          }
        };
      default:
        return anyReducer(state, action);
    }
  };
};
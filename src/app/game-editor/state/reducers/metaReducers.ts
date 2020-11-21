import { toDictionary } from "@app/shared";
import { ActionReducer } from "@ngrx/store";
import { get } from 'lodash';

import { gameActionTypes, SetGameData } from "../actions";
import { StoreEntity } from "./generics";
import { GameEditorFeature } from "./main.reducer";

export function editorMetaReducer(anyReducer: ActionReducer<any>) {
  return function newReducer(state: GameEditorFeature, action: SetGameData) {

    switch (action.type) {
      case gameActionTypes.SET_GAME_DATA:
        const updatedForm: any = Object.keys(action.payload.data).reduce((acc, key) => {
          const entities: StoreEntity[] = get(action.payload.data, key);
          acc[key] = { byId: toDictionary(entities) };
          return acc;
        }, {} as any);

        return {
          ...state,
          form: {
            ...state.form,
            ...updatedForm
          }
        } as any;
      default:
        return anyReducer(state, action);
    }
  };
};
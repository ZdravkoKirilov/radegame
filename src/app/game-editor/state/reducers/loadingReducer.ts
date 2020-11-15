import produce from "immer";

import { ModuleId } from "@app/game-mechanics";

import { EditorLoaderAction, loaderActionTypes } from '../actions';

export type EditorLoaderState = {
  loaded_modules: ModuleId[];
}

const initialState: EditorLoaderState = { loaded_modules: [] };


export const loadersReducer = (state: EditorLoaderState = initialState, action: EditorLoaderAction): EditorLoaderState => {

  switch (action.type) {
    case loaderActionTypes.ADD_LOADED_MODULES:
      return produce(state, draft => {
        draft.loaded_modules = [...draft.loaded_modules, ...action.payload.modules];
      });
    default:
      return state;
  }
};
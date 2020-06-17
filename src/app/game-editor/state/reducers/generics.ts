import { ActionReducer, combineReducers } from '@ngrx/store';
import produce from 'immer';
import omit from 'lodash/omit';

import { GameEntity, GameEntityList, AllEntity, ALL_ENTITIES } from '@app/game-mechanics';

import { EditorGenericAction } from '../actions';
import { actionTypes } from '../actions/actionTypes';

export interface EntityFeature {
  items: GameEntityList;
  showEditor: boolean;
  selectedEntity: GameEntity;
};

export type EntityForm = Omit<Record<keyof typeof ALL_ENTITIES, EntityFeature>, 'nodes'>;

const entityFeatureState: EntityFeature = {
  items: null,
  showEditor: false,
  selectedEntity: null,
};

export const createEntityReducer = (allowedKey: AllEntity): ActionReducer<EntityFeature> => {
  const entityReducer = (
    state: EntityFeature = { ...entityFeatureState },
    action: EditorGenericAction): EntityFeature => {
    const key = action.payload.key;

    if (key === allowedKey) {
      switch (action.type) {
        case actionTypes.SET_ITEM:
          return produce(state, draft => {
            draft.items[action.payload.data.id] = action.payload.data;
          });
        case actionTypes.REMOVE_ITEM:
          return produce(state, draft => {
            draft.items = omit(draft.items, action.payload.data.id)
          });
        case actionTypes.SET_ITEMS:
          return produce(state, draft => {
            draft.items = action.payload.data;
          });
        case actionTypes.CHANGE_SELECTED_ITEM:
          return produce(state, draft => {
            draft.selectedEntity = action.payload.data;
          });
        case actionTypes.TOGGLE_EDITOR:
          return produce(state, draft => {
            draft.showEditor = action.payload.data.showEditor;
          });
        default:
          return state;
      }
    }
    return state;
  }

  return entityReducer;
};

export const formReducer: ActionReducer<EntityForm> = combineReducers({
  tokens: createEntityReducer(ALL_ENTITIES.tokens),
  modules: createEntityReducer(ALL_ENTITIES.modules),
  choices: createEntityReducer(ALL_ENTITIES.choices),
  widgets: createEntityReducer(ALL_ENTITIES.widgets),
  images: createEntityReducer(ALL_ENTITIES.images),
  styles: createEntityReducer(ALL_ENTITIES.styles),
  sounds: createEntityReducer(ALL_ENTITIES.sounds),
  sandboxes: createEntityReducer(ALL_ENTITIES.sandboxes),
  expressions: createEntityReducer(ALL_ENTITIES.expressions),
  animations: createEntityReducer(ALL_ENTITIES.animations),
  setups: createEntityReducer(ALL_ENTITIES.setups),
  transitions: createEntityReducer(ALL_ENTITIES.transitions),
  texts: createEntityReducer(ALL_ENTITIES.texts),
  sonatas: createEntityReducer(ALL_ENTITIES.sonatas),
  shapes: createEntityReducer(ALL_ENTITIES.shapes),
  versions: createEntityReducer(ALL_ENTITIES.versions),
});

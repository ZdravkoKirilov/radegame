import { ActionReducer, combineReducers } from '@ngrx/store';
import produce from 'immer';

import {
  Animation, AnimationId, Expression, ExpressionId, ImageAsset, ImageAssetId, ModularEntity, Module, ModuleId, Sandbox, SandboxId, Setup, SetupId, Shape, ShapeId, Sonata, SonataId, Sound, SoundId, Style,
  StyleId, TextId, Token, TokenId, VersionedEntity, Widget, WidgetId, Text
} from '@app/game-mechanics';
import { toDictionary } from '@app/shared';

import { EditorGenericMutators } from '../actions';
import { genericActionTypes } from '../actions';
import { StoreKey, STORE_KEYS } from '../../utils';

export type StoreEntity = VersionedEntity | ModularEntity;

export interface EntityFeature {
  byId: Record<StoreEntity['id'], StoreEntity>;
};

export type EntityForm = {
  widgets: { byId: Record<WidgetId, Widget> };
  tokens: { byId: Record<TokenId, Token> };
  texts: { byId: Record<TextId, Text> };
  animations: { byId: Record<AnimationId, Animation> };
  modules: { byId: Record<ModuleId, Module> };
  setups: { byId: Record<SetupId, Setup> };
  images: { byId: Record<ImageAssetId, ImageAsset> };
  sounds: { byId: Record<SoundId, Sound> };
  sonatas: { byId: Record<SonataId, Sonata> };
  styles: { byId: Record<StyleId, Style> };
  sandboxes: { byId: Record<SandboxId, Sandbox> };
  expressions: { byId: Record<ExpressionId, Expression> };
  shapes: { byId: Record<ShapeId, Shape> };
};

const entityFeatureState: EntityFeature = {
  byId: {},
};

export const createEntityReducer = (allowedKey: StoreKey): ActionReducer<EntityFeature> => {
  const entityReducer = (state: EntityFeature = { ...entityFeatureState }, action: EditorGenericMutators): EntityFeature => {
    const storeKey = action?.payload?.storeKey;
    if (storeKey === allowedKey) {
      switch (action.type) {
        case genericActionTypes.SET_ITEM:
          return {
            ...state,
            byId: produce(state.byId, draft => {
              draft[action.payload.item.id] = action.payload.item;
            }),
          };
        case genericActionTypes.REMOVE_ITEM:
          return {
            ...state,
            byId: produce(state.byId, draft => {
              delete draft[action.payload.item.id];
            }),
          };
        case genericActionTypes.SET_ITEMS:
          const newState = produce(state, draft => {
            draft.byId = toDictionary(action.payload.items);
          });
          return newState;
        default:
          return state;
      }
    }
    return state;
  }

  return entityReducer;
};

export const formReducer: ActionReducer<EntityForm> = combineReducers({
  tokens: createEntityReducer(STORE_KEYS.tokens),
  modules: createEntityReducer(STORE_KEYS.modules),
  widgets: createEntityReducer(STORE_KEYS.widgets),
  images: createEntityReducer(STORE_KEYS.images),
  styles: createEntityReducer(STORE_KEYS.styles),
  sounds: createEntityReducer(STORE_KEYS.sounds),
  sandboxes: createEntityReducer(STORE_KEYS.sandboxes),
  expressions: createEntityReducer(STORE_KEYS.expressions),
  animations: createEntityReducer(STORE_KEYS.animations),
  setups: createEntityReducer(STORE_KEYS.setups),
  texts: createEntityReducer(STORE_KEYS.texts),
  sonatas: createEntityReducer(STORE_KEYS.sonatas),
  shapes: createEntityReducer(STORE_KEYS.shapes),
});

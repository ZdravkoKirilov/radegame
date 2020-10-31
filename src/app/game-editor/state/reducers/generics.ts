import { ActionReducer, combineReducers } from '@ngrx/store';
import produce from 'immer';

import { Animation, AnimationId, Expression, ExpressionId, ImageAsset, ImageAssetId, ModularEntity, Module, ModuleId, Sandbox, SandboxId, Setup, SetupId, Shape, ShapeId, Sonata, SonataId, Sound, SoundId, StoreKey, STORE_KEYS, Style, StyleId, TextId, Token, TokenId, VersionedEntity, Widget, WidgetId, Text } from '@app/game-mechanics';

import { EditorGenericMutators } from '../actions';
import { genericActionTypes } from '../actions';

export type StoreEntity = VersionedEntity | ModularEntity;

export interface EntityFeature {
  byId: Map<StoreEntity['id'], StoreEntity>;
};

export type EntityForm = {
  widgets: { byId: Map<WidgetId, Widget> };
  tokens: { byId: Map<TokenId, Token> };
  texts: { byId: Map<TextId, Text> };
  animations: { byId: Map<AnimationId, Animation> };
  modules: { byId: Map<ModuleId, Module> };
  setups: { byId: Map<SetupId, Setup> };
  images: { byId: Map<ImageAssetId, ImageAsset> };
  sounds: { byId: Map<SoundId, Sound> };
  sonatas: { byId: Map<SonataId, Sonata> };
  styles: { byId: Map<StyleId, Style> };
  sandboxes: { byId: Map<SandboxId, Sandbox> };
  expressions: { byId: Map<ExpressionId, Expression> };
  shapes: { byId: Map<ShapeId, Shape> };
};

const entityFeatureState: EntityFeature = {
  byId: new Map(),
};

export const createEntityReducer = (allowedKey: StoreKey): ActionReducer<EntityFeature> => {
  const entityReducer = (state: EntityFeature = { ...entityFeatureState }, action: EditorGenericMutators): EntityFeature => {
    const { storeKey } = action.payload;

    if (storeKey === allowedKey) {
      switch (action.type) {
        case genericActionTypes.SET_ITEM:
          return {
            ...state,
            byId: produce(state.byId, draft => {
              draft.set(action.payload.item.id, action.payload.item);
            }),
          };
        case genericActionTypes.REMOVE_ITEM:
          return {
            ...state,
            byId: produce(state.byId, draft => {
              draft.delete(action.payload.item.id);
            }),
          };
        case genericActionTypes.SET_ITEMS:
          return produce(state, draft => {
            draft.byId = new Map(Object.values(action.payload.items).map(item => [item.id, item]));
          });
        default:
          return state;
      }
    }
    return state;
  }

  return entityReducer;
};

export const formReducer: ActionReducer<{}> = combineReducers({
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

import { Action } from '@ngrx/store';

import { GameEntity, AllEntity, GameId, EntityId, Setup, Module, Sandbox } from '@app/game-mechanics';
import { Dictionary } from '@app/shared';

export const genericActionTypes = {
  SAVE_ITEM: 'SAVE_ITEM',
  SAVE_ITEM_SUCCESS: 'SAVE_ITEM_SUCCESS',
  SAVE_ITEM_FAIL: 'SAVE_ITEM_FAIL',

  SET_ITEM: 'SET_ITEM',

  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',
  DELETE_ITEM_FAIL: 'DELETE_ITEM_FAIL',

  REMOVE_ITEM: 'REMOVE_ITEM',

  FETCH_ITEMS: 'FETCH_ITEMS',
  FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS',
  FETCH_ITEMS_FAIL: 'FETCH_ITEMS_FAIL',
  SET_ITEMS: 'SET_ITEMS',

  FETCH_ITEM: 'FETCH_ITEM',
  FETCH_ITEM_SUCCESS: 'FETCH_ITEM_SUCCESS',
  FETCH_ITEM_FAIL: 'FETCH_ITEM_FAIL',

  SAVE_SETUP: '[Editor] SAVE_SETUP',
  DELETE_SETUP: '[Editor] DELETE_SETUP',

  SAVE_MODULE: '[Editor] SAVE_MODULE',
  DELETE_MODULE: '[Editor] DELETE_MODULE',

  SAVE_SANDBOX: '[Editor] SAVE_SANDBOX',
  DELETE_SANDBOX: '[Editor] DELETE_SANDBOX',

} as const;

export type EditorGenericActionType = keyof typeof genericActionTypes;

type PayloadWithEntity<T> = {
  key: AllEntity;
  data: T;
};

type PayloadWithGameId = {
  key: AllEntity;
  data: {
    gameId: GameId;
  }
};

export type FetchItemPayload<T extends EntityId> = {
  key: AllEntity,
  data: {
    gameId: GameId;
    itemId: T;
  }
};

export type ResponseWithEntities<T> = {
  key: AllEntity;
  data: {
    entities: Dictionary<T>;
  }
};

export type PayloadWithItem<T> = {
  key: AllEntity;
  data: T;
}

export class SaveSetup implements Action {
  readonly type = genericActionTypes.SAVE_SETUP;
  constructor(public payload: { setup: Setup }) { }
}

export class DeleteSetup implements Action {
  readonly type = genericActionTypes.DELETE_SETUP;
  constructor(public payload: { setup: Setup }) { }
}

export class SaveSandbox implements Action {
  readonly type = genericActionTypes.SAVE_SANDBOX;
  constructor(public payload: { sandbox: Sandbox }) { }
}

export class DeleteSandbox implements Action {
  readonly type = genericActionTypes.DELETE_SANDBOX;
  constructor(public payload: { sandbox: Sandbox }) { }
}

export class SaveModule implements Action {
  readonly type = genericActionTypes.SAVE_MODULE;
  constructor(public payload: { module: Module }) { }
}

export class DeleteModule implements Action {
  readonly type = genericActionTypes.DELETE_MODULE;
  constructor(public payload: { module: Module }) { }
}

export class SaveItemAction<T> implements Action {
  readonly type = genericActionTypes.SAVE_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
};

export class SetItemAction<T> implements Action {
  readonly type = genericActionTypes.SET_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class SaveItemSuccessAction<T> implements Action {
  readonly type = genericActionTypes.SAVE_ITEM_SUCCESS;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class SaveItemFailAction<T> implements Action {
  readonly type = genericActionTypes.SAVE_ITEM_FAIL;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class DeleteItemAction<T extends GameEntity> implements Action {
  readonly type = genericActionTypes.DELETE_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class DeleteItemSuccessAction<T> implements Action {
  readonly type = genericActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class DeleteItemFailAction<T> implements Action {
  readonly type = genericActionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class RemoveItemAction<T> implements Action {
  readonly type = genericActionTypes.REMOVE_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class SetItemsAction<T> implements Action {
  readonly type = genericActionTypes.SET_ITEMS;
  constructor(public payload: ResponseWithEntities<T>) { }
}
export class FetchItemsAction implements Action {
  readonly type = genericActionTypes.FETCH_ITEMS;
  constructor(public payload: PayloadWithGameId) { }
}

export class FetchItemsSuccessAction<T> implements Action {
  readonly type = genericActionTypes.FETCH_ITEMS_SUCCESS;
  constructor(public payload: ResponseWithEntities<T>) { }
}

export class FetchItemAction<T extends EntityId> implements Action {
  readonly type = genericActionTypes.FETCH_ITEM;
  constructor(public payload: FetchItemPayload<T>) { }
}

export class FetchItemSuccessAction<T> implements Action {
  readonly type = genericActionTypes.FETCH_ITEM_SUCCESS;
  constructor(public payload: PayloadWithItem<T>) { }
}

export type EditorGenericAction<T = GameEntity> = SaveItemAction<T> | SaveItemSuccessAction<T> |
  SaveItemFailAction<T> | SetItemAction<T> | DeleteItemAction<T> | DeleteItemSuccessAction<T> |
  DeleteItemFailAction<T> | RemoveItemAction<T> | SetItemAction<T> |
  FetchItemsAction | FetchItemsSuccessAction<T> | FetchItemAction<EntityId> | FetchItemSuccessAction<T> | SetItemsAction<T>;
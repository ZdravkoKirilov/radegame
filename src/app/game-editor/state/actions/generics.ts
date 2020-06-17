import { Action } from '@ngrx/store';

import { GameEntity, AllEntity, GameId, EntityId } from '@app/game-mechanics';
import { Dictionary } from '@app/shared';

import { actionTypes } from './actionTypes';

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

export class SaveItemAction<T> implements Action {
  readonly type = actionTypes.SAVE_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
};

export class SetItemAction<T> implements Action {
  readonly type = actionTypes.SET_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class SaveItemSuccessAction<T> implements Action {
  readonly type = actionTypes.SAVE_ITEM_SUCCESS;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class SaveItemFailAction<T> implements Action {
  readonly type = actionTypes.SAVE_ITEM_FAIL;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class DeleteItemAction<T> implements Action {
  readonly type = actionTypes.DELETE_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class DeleteItemSuccessAction<T> implements Action {
  readonly type = actionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class DeleteItemFailAction<T> implements Action {
  readonly type = actionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class RemoveItemAction<T> implements Action {
  readonly type = actionTypes.REMOVE_ITEM;
  constructor(public payload: PayloadWithEntity<T>) { }
}

export class SetItemsAction<T> implements Action {
  readonly type = actionTypes.SET_ITEMS;
  constructor(public payload: ResponseWithEntities<T>) { }
}

export class ToggleEditorAction implements Action {
  readonly type = actionTypes.TOGGLE_EDITOR;
  constructor(public payload: { key: AllEntity; data: { showEditor: boolean } }) { }
}

export class ChangeSelectedItemAction<T> implements Action {
  readonly type = actionTypes.CHANGE_SELECTED_ITEM;
  constructor(public payload: PayloadWithItem<T>) { }
}

export class FetchItemsAction implements Action {
  readonly type = actionTypes.FETCH_ITEMS;
  constructor(public payload: PayloadWithGameId) { }
}

export class FetchItemsSuccessAction<T> implements Action {
  readonly type = actionTypes.FETCH_ITEMS_SUCCESS;
  constructor(public payload: ResponseWithEntities<T>) { }
}

export class FetchItemAction<T extends EntityId> implements Action {
  readonly type = actionTypes.FETCH_ITEM;
  constructor(public payload: FetchItemPayload<T>) { }
}

export class FetchItemSuccessAction<T> implements Action {
  readonly type = actionTypes.FETCH_ITEM_SUCCESS;
  constructor(public payload: PayloadWithItem<T>) { }
}

export type EditorGenericAction<T = GameEntity> = SaveItemAction<T> | SaveItemSuccessAction<T> |
  SaveItemFailAction<T> | SetItemAction<T> | DeleteItemAction<T> | DeleteItemSuccessAction<T> |
  DeleteItemFailAction<T> | RemoveItemAction<T> | SetItemAction<T> | ToggleEditorAction | ChangeSelectedItemAction<T> |
  FetchItemsAction | FetchItemsSuccessAction<T> | FetchItemAction<EntityId> | FetchItemSuccessAction<T> | SetItemsAction<T>;
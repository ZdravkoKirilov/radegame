import { Action } from '@ngrx/store';

import { StoreKey, VersionedEntity, VersionId, ModularEntity, ModuleId, NestedEntity } from '@app/game-mechanics';

export const genericActionTypes = {

  SAVE_ITEM: 'SAVE_VERSIONED_ITEM',
  SET_ITEM: 'SET_ITEM',

  DELETE_ITEM: 'DELETE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',

  FETCH_VERSIONED_ITEMS: 'FETCH_VERSIONED_ITEMS',
  FETCH_MODULAR_ITEMS: 'FETCH_MODULAR_ITEMS',
  SET_ITEMS: 'SET_ITEMS',
  
} as const;

export class SaveItem implements Action {
  readonly type = genericActionTypes.SAVE_ITEM;
  constructor(public payload: { item: VersionedEntity | ModularEntity | NestedEntity }) { }
}

export class SetItem implements Action {
  readonly type = genericActionTypes.SET_ITEM;
  constructor(public payload: { item: ModularEntity | VersionedEntity, storeKey: StoreKey }) { }
}

export class DeleteItem implements Action {
  readonly type = genericActionTypes.DELETE_ITEM;
  constructor(public payload: { item: VersionedEntity | ModularEntity | NestedEntity }) { }
}

export class RemoveItem implements Action {
  readonly type = genericActionTypes.REMOVE_ITEM;
  constructor(public payload: { item: ModularEntity | VersionedEntity, storeKey: StoreKey }) { }
}

export class FetchVersionedItems implements Action {
  readonly type = genericActionTypes.FETCH_VERSIONED_ITEMS;
  constructor(public payload: { entityType: VersionedEntity['__tag'], versionId: VersionId }) { }
}

export class FetchModularItems implements Action {
  readonly type = genericActionTypes.FETCH_MODULAR_ITEMS;
  constructor(public payload: { entityType: ModularEntity['__tag'], moduleId: ModuleId }) { }
}

export class SetItems implements Action {
  readonly type = genericActionTypes.SET_ITEMS;
  constructor(public payload: { storeKey: StoreKey, items: Array<VersionedEntity | ModularEntity> }) { }
}

export type EditorGenericCommands = SaveItem | DeleteItem | FetchVersionedItems | FetchModularItems;

export type EditorGenericMutators = SetItem | SetItems | RemoveItem;
import { Action } from '@ngrx/store';

import { GameEntity, GameEntityList, GameTemplate, AllEntity } from '@app/game-mechanics';
import { actionTypes } from './actionTypes';

export interface GenericActionPayload {
    key: AllEntity;
    data?: GameEntity | GameEntityList | GameTemplate | boolean | number;
}

export class SaveItemAction implements Action {
    readonly type = actionTypes.SAVE_ITEM;
    constructor(public payload: GenericActionPayload) { }
}

export class SetItemAction implements Action {
    readonly type = actionTypes.SET_ITEM;
    constructor(public payload: GenericActionPayload) { }
}

export class SaveItemSuccessAction implements Action {
    readonly type = actionTypes.SAVE_ITEM_SUCCESS;
    constructor(public payload?: GenericActionPayload) { }
}

export class SaveItemFailAction implements Action {
    readonly type = actionTypes.SAVE_ITEM_FAIL;
    constructor(public payload?: GenericActionPayload) { }
}

export class DeleteItemAction implements Action {
    readonly type = actionTypes.DELETE_ITEM;
    constructor(public payload: GenericActionPayload) { }
}

export class DeleteItemSuccessAction implements Action {
    readonly type = actionTypes.DELETE_ITEM_SUCCESS;
    constructor(public payload?: GenericActionPayload) { }
}

export class DeleteItemFailAction implements Action {
    readonly type = actionTypes.DELETE_ITEM_FAIL;
    constructor(public payload?: GenericActionPayload) { }
}

export class RemoveItemAction implements Action {
    readonly type = actionTypes.REMOVE_ITEM;
    constructor(public payload: GenericActionPayload) { }
}

export class SetItemsAction implements Action {
    readonly type = actionTypes.SET_ITEMS;
    constructor(public payload: GenericActionPayload) { }
}

export class ToggleEditorAction implements Action {
    readonly type = actionTypes.TOGGLE_EDITOR;
    constructor(public payload: GenericActionPayload) { }
}

export class ChangeSelectedItemAction implements Action {
    readonly type = actionTypes.CHANGE_SELECTED_ITEM;
    constructor(public payload: GenericActionPayload) { }
}

export class SetAllItemsAction implements Action {
    readonly type = actionTypes.SET_ALL_ITEMS;
    constructor(public payload: GenericActionPayload) { }
}

export class FetchItemsAction implements Action {
    readonly type = actionTypes.FETCH_ITEMS;
    constructor(public payload: GenericActionPayload) { }
}

export class FetchItemsSuccessAction implements Action {
    readonly type = actionTypes.FETCH_ITEMS_SUCCESS;
    constructor(public payload: GenericActionPayload) { }
}

export class FetchItemsFailAction implements Action {
    readonly type = actionTypes.FETCH_ITEMS_FAIL;
    constructor(public payload: GenericActionPayload) { }
}

export type EditorGenericAction = SaveItemAction | SaveItemSuccessAction |
    SaveItemFailAction | SetItemAction | DeleteItemAction | DeleteItemSuccessAction |
    DeleteItemFailAction | RemoveItemAction | SetItemAction | ToggleEditorAction | ChangeSelectedItemAction | SetAllItemsAction |
    FetchItemsAction | FetchItemsSuccessAction | FetchItemsFailAction;
export const CLEAR_FORM = 'CLEAR_FORM';

export const actionTypes = {
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

    TOGGLE_EDITOR: 'TOGGLE_EDITOR',
    CHANGE_SELECTED_ITEM: 'CHANGE_SELECTED_ITEM',

    SET_ALL_ITEMS: 'SET_ALL_ITEMS'
}

export type EditorActionType = typeof actionTypes.SAVE_ITEM | typeof actionTypes.REMOVE_ITEM |
    typeof actionTypes.SET_ITEMS | typeof actionTypes.TOGGLE_EDITOR |
    typeof actionTypes.CHANGE_SELECTED_ITEM | typeof actionTypes.SAVE_ITEM_SUCCESS |
    typeof actionTypes.SAVE_ITEM_FAIL | typeof actionTypes.DELETE_ITEM |
    typeof actionTypes.SET_ITEM | typeof actionTypes.DELETE_ITEM_SUCCESS |
    typeof actionTypes.DELETE_ITEM_FAIL | typeof actionTypes.SET_ALL_ITEMS;











































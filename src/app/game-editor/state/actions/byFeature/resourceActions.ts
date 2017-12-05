import * as actionTypes from '../actionTypes';
import { Action } from '@ngrx/store';
import { Resource, ResourceList } from '../../../../game-mechanics/models/index';

export class SaveResourceAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = actionTypes.SAVE_RESOURCE;
}

export class AddResourceAction implements Action {
    constructor(public payload: Resource) {

    }

    readonly type = actionTypes.ADD_RESOURCE;
}

export class SaveResourceSuccessAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = actionTypes.SAVE_RESOURCE_SUCCESS;
}

export class SaveResourceFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_RESOURCE_FAIL;
}


export class DeleteResourceAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = actionTypes.DELETE_RESOURCE;
}

export class RemoveResourceAction implements Action {
    constructor(public payload: Resource) {

    }

    readonly type = actionTypes.REMOVE_RESOURCE;
}

export class DeleteResourceSuccessAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = actionTypes.DELETE_RESOURCE_SUCCESS;
}

export class DeleteResourceFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.DELETE_RESOURCE_FAIL;
}


export class GetResourcesAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = actionTypes.GET_RESOURCES;
}

export class SetResourcesAction implements Action {
    constructor(public payload: ResourceList) {

    }

    readonly type = actionTypes.SET_RESOURCES;
}

export class GetResourcesSuccessAction implements Action {
    constructor(public payload: Resource[]) {
    }

    readonly type = actionTypes.GET_RESOURCES_SUCCESS;
}

export class GetResourcesFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_RESOURCES_FAIL;
}

export class ToggleEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = actionTypes.TOGGLE_RESOURCE_EDITOR;
}

export class ChangeSelectedResourceAction implements Action {
    constructor(public payload?: Resource) {
    }

    readonly type = actionTypes.CHANGE_SELECTED_RESOURCE;
}

export type Actions =
    | SaveResourceAction
    | SaveResourceSuccessAction
    | SaveResourceFailAction
    | AddResourceAction
    | DeleteResourceAction
    | RemoveResourceAction
    | DeleteResourceSuccessAction
    | DeleteResourceFailAction
    | GetResourcesAction
    | SetResourcesAction
    | GetResourcesSuccessAction
    | GetResourcesFailAction
    | ToggleEditorAction
    | ChangeSelectedResourceAction;

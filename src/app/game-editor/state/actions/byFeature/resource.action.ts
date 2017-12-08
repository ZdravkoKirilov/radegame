import { Action } from '@ngrx/store';
import { Resource, ResourceList } from '../../../../game-mechanics/models/index';
import {
    ADD_RESOURCE,
    CHANGE_SELECTED_RESOURCE,
    DELETE_RESOURCE,
    DELETE_RESOURCE_FAIL,
    DELETE_RESOURCE_SUCCESS,
    GET_RESOURCES,
    GET_RESOURCES_FAIL,
    GET_RESOURCES_SUCCESS,
    REMOVE_RESOURCE,
    SAVE_RESOURCE,
    SAVE_RESOURCE_FAIL,
    SAVE_RESOURCE_SUCCESS,
    SET_RESOURCES,
    TOGGLE_RESOURCE_EDITOR
} from '../../reducers/byFeature/resources.reducer';

export class SaveResourceAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = SAVE_RESOURCE;
}

export class AddResourceAction implements Action {
    constructor(public payload: Resource) {

    }

    readonly type = ADD_RESOURCE;
}

export class SaveResourceSuccessAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = SAVE_RESOURCE_SUCCESS;
}

export class SaveResourceFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_RESOURCE_FAIL;
}


export class DeleteResourceAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = DELETE_RESOURCE;
}

export class RemoveResourceAction implements Action {
    constructor(public payload: Resource) {

    }

    readonly type = REMOVE_RESOURCE;
}

export class DeleteResourceSuccessAction implements Action {
    constructor(public payload: Resource) {
    }

    readonly type = DELETE_RESOURCE_SUCCESS;
}

export class DeleteResourceFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_RESOURCE_FAIL;
}


export class GetResourcesAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = GET_RESOURCES;
}

export class SetResourcesAction implements Action {
    constructor(public payload: ResourceList) {

    }

    readonly type = SET_RESOURCES;
}

export class GetResourcesSuccessAction implements Action {
    constructor(public payload: Resource[]) {
    }

    readonly type = GET_RESOURCES_SUCCESS;
}

export class GetResourcesFailAction implements Action {
    readonly payload = null;
    readonly type = GET_RESOURCES_FAIL;
}

export class ToggleResourceEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_RESOURCE_EDITOR;
}

export class ChangeSelectedResourceAction implements Action {
    constructor(public payload?: Resource) {
    }

    readonly type = CHANGE_SELECTED_RESOURCE;
}

export type ResourceAction =
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
    | ToggleResourceEditorAction
    | ChangeSelectedResourceAction;

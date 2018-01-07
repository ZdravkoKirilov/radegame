import { Action } from '@ngrx/store';
import { Activity, ActivityList } from '../../../../game-mechanics/models/index';
import {
    ADD_ACTIVITY,
    CHANGE_SELECTED_ACTIVITY,
    DELETE_ACTIVITY,
    DELETE_ACTIVITY_SUCCESS,
    DELETE_ACTIVITY_FAIL,
    REMOVE_ACTIVITY,
    SAVE_ACTIVITY,
    SAVE_ACTIVITY_SUCCESS,
    SAVE_ACTIVITY_FAIL,
    SET_ACTIVITIES,
    TOGGLE_ACTIVITY_EDITOR,
    GET_ACTIVITIES,
    GET_ACTIVITIES_SUCCESS,
    GET_ACTIVITIES_FAIL
} from '../../reducers/byFeature/activity.reducer';


export class SaveActivityAction implements Action {
    constructor(public payload: Activity) {
    }

    readonly type = SAVE_ACTIVITY;
}

export class AddActivityAction implements Action {
    constructor(public payload: Activity) {
    }

    readonly type = ADD_ACTIVITY;
}

export class SaveActivitySuccessAction implements Action {
    constructor(public payload: Activity) {
    }

    readonly type = SAVE_ACTIVITY_SUCCESS;
}

export class SaveActivityFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_ACTIVITY_FAIL;
}

export class GetActivitiesAction implements Action {
    constructor(public payload: number) { }
    readonly type = GET_ACTIVITIES;
}

export class GetActivitiesSuccessAction implements Action {
    readonly payload = null;
    readonly type = GET_ACTIVITIES_SUCCESS;
}

export class GetActivitiesFailAction implements Action {
    readonly payload = null;
    readonly type = GET_ACTIVITIES_FAIL;
}

export class SetActivitiesAction implements Action {
    constructor(public payload: ActivityList) {
    }

    readonly type = SET_ACTIVITIES;

}

export class ToggleActivityEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_ACTIVITY_EDITOR;
}

export class ChangeSelectedActivityAction implements Action {
    constructor(public payload?: Activity) {
    }

    readonly type = CHANGE_SELECTED_ACTIVITY;
}

export class DeleteActivityAction implements Action {
    constructor(public payload: Activity) {
    }

    readonly type = DELETE_ACTIVITY;
}

export class RemoveActivityAction implements Action {
    constructor(public payload: Activity) {

    }

    readonly type = REMOVE_ACTIVITY;
}

export class DeleteActivitySuccessAction implements Action {
    constructor(public payload: Activity) {
    }

    readonly type = DELETE_ACTIVITY_SUCCESS;
}

export class DeleteActivityFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_ACTIVITY_FAIL;
}

export type ActivityAction =
    | SaveActivityAction
    | SaveActivitySuccessAction
    | SaveActivityFailAction
    | SetActivitiesAction
    | ToggleActivityEditorAction
    | ChangeSelectedActivityAction
    | AddActivityAction
    | DeleteActivityAction
    | DeleteActivitySuccessAction
    | DeleteActivityFailAction
    | RemoveActivityAction;

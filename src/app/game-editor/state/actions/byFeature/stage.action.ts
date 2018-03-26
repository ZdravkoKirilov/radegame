// import { Action } from '@ngrx/store';
// import { Stage, StageList } from '../../../../game-mechanics';
// import {
//     ADD_STAGE,
//     CHANGE_SELECTED_STAGE,
//     DELETE_STAGE,
//     DELETE_STAGE_SUCCESS,
//     DELETE_STAGE_FAIL,
//     REMOVE_STAGE,
//     SAVE_STAGE,
//     SAVE_STAGE_SUCCESS,
//     SAVE_STAGE_FAIL,
//     SET_STAGES,
//     TOGGLE_STAGE_EDITOR,
//     GET_STAGES,
//     GET_STAGES_SUCCESS,
//     GET_STAGES_FAIL
// } from '../../reducers';


// export class SaveStageAction implements Action {
//     constructor(public payload: Stage) {
//     }

//     readonly type = SAVE_STAGE;
// }

// export class AddStageAction implements Action {
//     constructor(public payload: Stage) {
//     }

//     readonly type = ADD_STAGE;
// }

// export class SaveStageSuccessAction implements Action {
//     constructor(public payload: Stage) {
//     }

//     readonly type = SAVE_STAGE_SUCCESS;
// }

// export class SaveStageFailAction implements Action {
//     readonly payload = null;
//     readonly type = SAVE_STAGE_FAIL;
// }

// export class GetStagesAction implements Action {
//     constructor(public payload: number) {
//     }

//     readonly type = GET_STAGES;
// }

// export class GetStagesSuccessAction implements Action {
//     readonly payload = null;
//     readonly type = GET_STAGES_SUCCESS;
// }

// export class GetStagesFailAction implements Action {
//     readonly payload = null;
//     readonly type = GET_STAGES_FAIL;
// }

// export class SetStagesAction implements Action {
//     constructor(public payload: StageList) {
//     }

//     readonly type = SET_STAGES;

// }

// export class ToggleStageEditorAction implements Action {
//     constructor(public payload: boolean) {
//     }

//     readonly type = TOGGLE_STAGE_EDITOR;
// }

// export class ChangeSelectedStageAction implements Action {
//     constructor(public payload?: Stage) {
//     }

//     readonly type = CHANGE_SELECTED_STAGE;
// }

// export class DeleteStageAction implements Action {
//     constructor(public payload: Stage) {
//     }

//     readonly type = DELETE_STAGE;
// }

// export class RemoveStageAction implements Action {
//     constructor(public payload: Stage) {

//     }

//     readonly type = REMOVE_STAGE;
// }

// export class DeleteStageSuccessAction implements Action {
//     constructor(public payload: Stage) {
//     }

//     readonly type = DELETE_STAGE_SUCCESS;
// }

// export class DeleteStageFailAction implements Action {
//     readonly payload = null;
//     readonly type = DELETE_STAGE_FAIL;
// }

// export type StageAction =
//     | SaveStageAction
//     | SaveStageSuccessAction
//     | SaveStageFailAction
//     | SetStagesAction
//     | ToggleStageEditorAction
//     | ChangeSelectedStageAction
//     | AddStageAction
//     | DeleteStageAction
//     | DeleteStageSuccessAction
//     | DeleteStageFailAction
//     | RemoveStageAction
//     | GetStagesAction
//     | GetStagesSuccessAction
//     | GetStagesFailAction
//     | SetStagesAction;

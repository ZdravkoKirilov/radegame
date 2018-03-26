// import { Action } from '@ngrx/store';
// import { Trivia, TriviaList } from '../../../../game-mechanics';
// import {
//     ADD_TRIVIA,
//     CHANGE_SELECTED_TRIVIA,
//     DELETE_TRIVIA,
//     DELETE_TRIVIA_SUCCESS,
//     DELETE_TRIVIA_FAIL,
//     REMOVE_TRIVIA,
//     SAVE_TRIVIA,
//     SAVE_TRIVIA_SUCCESS,
//     SAVE_TRIVIA_FAIL,
//     SET_TRIVIAS,
//     TOGGLE_TRIVIA_EDITOR,
//     GET_TRIVIAS,
//     GET_TRIVIAS_SUCCESS,
//     GET_TRIVIAS_FAIL
// } from '../../reducers';

// export class SaveTriviaAction implements Action {
//     constructor(public payload: Trivia) {
//     }

//     readonly type = SAVE_TRIVIA;
// }

// export class AddTriviaAction implements Action {
//     constructor(public payload: Trivia) {
//     }

//     readonly type = ADD_TRIVIA;
// }

// export class SaveTriviaSuccessAction implements Action {
//     constructor(public payload: Trivia) {
//     }

//     readonly type = SAVE_TRIVIA_SUCCESS;
// }

// export class SaveTriviaFailAction implements Action {
//     readonly payload = null;
//     readonly type = SAVE_TRIVIA_FAIL;
// }

// export class GetTriviasAction implements Action {
//     constructor(public payload: number) {
//     }

//     readonly type = GET_TRIVIAS;
// }

// export class GetTriviasSuccessAction implements Action {
//     readonly payload = null;
//     readonly type = GET_TRIVIAS_SUCCESS;
// }

// export class GetTriviasFailAction implements Action {
//     readonly payload = null;
//     readonly type = GET_TRIVIAS_FAIL;
// }

// export class SetTriviasAction implements Action {
//     constructor(public payload: TriviaList) {
//     }

//     readonly type = SET_TRIVIAS;

// }

// export class ToggleTriviaEditorAction implements Action {
//     constructor(public payload: boolean) {
//     }

//     readonly type = TOGGLE_TRIVIA_EDITOR;
// }

// export class ChangeSelectedTriviaAction implements Action {
//     constructor(public payload?: Trivia) {
//     }

//     readonly type = CHANGE_SELECTED_TRIVIA;
// }

// export class DeleteTriviaAction implements Action {
//     constructor(public payload: Trivia) {
//     }

//     readonly type = DELETE_TRIVIA;
// }

// export class RemoveTriviaAction implements Action {
//     constructor(public payload: Trivia) {

//     }

//     readonly type = REMOVE_TRIVIA;
// }

// export class DeleteTriviaSuccessAction implements Action {
//     constructor(public payload: Trivia) {
//     }

//     readonly type = DELETE_TRIVIA_SUCCESS;
// }

// export class DeleteTriviaFailAction implements Action {
//     readonly payload = null;
//     readonly type = DELETE_TRIVIA_FAIL;
// }

// export type TriviaAction =
//     | SaveTriviaAction
//     | SaveTriviaSuccessAction
//     | SaveTriviaFailAction
//     | SetTriviasAction
//     | ToggleTriviaEditorAction
//     | ChangeSelectedTriviaAction
//     | AddTriviaAction
//     | DeleteTriviaAction
//     | DeleteTriviaSuccessAction
//     | DeleteTriviaFailAction
//     | RemoveTriviaAction
//     | GetTriviasAction
//     | GetTriviasSuccessAction
//     | GetTriviasFailAction
//     | SetTriviasAction;

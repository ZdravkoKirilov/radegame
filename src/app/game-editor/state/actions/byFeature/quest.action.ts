import { Action } from '@ngrx/store';
import { Quest, QuestList } from '../../../../game-mechanics';
import {
    ADD_QUEST,
    CHANGE_SELECTED_QUEST,
    DELETE_QUEST,
    DELETE_QUEST_SUCCESS,
    DELETE_QUEST_FAIL,
    REMOVE_QUEST,
    SAVE_QUEST,
    SAVE_QUEST_SUCCESS,
    SAVE_QUEST_FAIL,
    SET_QUESTS,
    TOGGLE_QUEST_EDITOR,
    GET_QUESTS,
    GET_QUESTS_SUCCESS,
    GET_QUESTS_FAIL
} from '../../reducers/byFeature/quest.reducer';


export class SaveQuestAction implements Action {
    constructor(public payload: Quest) {
    }

    readonly type = SAVE_QUEST;
}

export class AddQuestAction implements Action {
    constructor(public payload: Quest) {
    }

    readonly type = ADD_QUEST;
}

export class SaveQuestSuccessAction implements Action {
    constructor(public payload: Quest) {
    }

    readonly type = SAVE_QUEST_SUCCESS;
}

export class SaveQuestFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_QUEST_FAIL;
}

export class GetQuestsAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = GET_QUESTS;
}

export class GetQuestsSuccessAction implements Action {
    readonly payload = null;
    readonly type = GET_QUESTS_SUCCESS;
}

export class GetQuestsFailAction implements Action {
    readonly payload = null;
    readonly type = GET_QUESTS_FAIL;
}

export class SetQuestsAction implements Action {
    constructor(public payload: QuestList) {
    }

    readonly type = SET_QUESTS;

}

export class ToggleQuestEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_QUEST_EDITOR;
}

export class ChangeSelectedQuestAction implements Action {
    constructor(public payload?: Quest) {
    }

    readonly type = CHANGE_SELECTED_QUEST;
}

export class DeleteQuestAction implements Action {
    constructor(public payload: Quest) {
    }

    readonly type = DELETE_QUEST;
}

export class RemoveQuestAction implements Action {
    constructor(public payload: Quest) {

    }

    readonly type = REMOVE_QUEST;
}

export class DeleteQuestSuccessAction implements Action {
    constructor(public payload: Quest) {
    }

    readonly type = DELETE_QUEST_SUCCESS;
}

export class DeleteQuestFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_QUEST_FAIL;
}

export type QuestAction =
    | SaveQuestAction
    | SaveQuestSuccessAction
    | SaveQuestFailAction
    | SetQuestsAction
    | ToggleQuestEditorAction
    | ChangeSelectedQuestAction
    | AddQuestAction
    | DeleteQuestAction
    | DeleteQuestSuccessAction
    | DeleteQuestFailAction
    | RemoveQuestAction
    | GetQuestsAction
    | GetQuestsSuccessAction
    | GetQuestsFailAction
    | SetQuestsAction;

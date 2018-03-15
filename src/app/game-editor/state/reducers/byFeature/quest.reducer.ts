import { createSelector } from '@ngrx/store';

import { Quest, Game } from '../../../../game-mechanics';
import { selectFeature } from '../selectors';
import { selectGame } from './assets.reducer';
import { GameEditorFeature } from '../main.reducer';
import { QuestAction } from '../../actions';

export interface GameQuest {
    items?: {
        [key: string]: Quest
    };
    lastInsert?: Quest;
    lastDelete?: Quest;
    showEditor?: boolean;
    selectedItem?: Quest;
}

const initialState: GameQuest = {
    items: null,
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
};

export const SAVE_QUEST = 'SAVE_QUEST';
export const DELETE_QUEST = 'DELETE_QUEST';
export const SET_QUESTS = 'SET_QUESTS';
export const GET_QUESTS = 'GET_QUESTS';
export const GET_QUESTS_SUCCESS = 'GET_QUESTS_SUCCESS';
export const GET_QUESTS_FAIL = 'GET_QUESTS_FAIL';
export const ADD_QUEST = 'ADD_QUEST';
export const SAVE_QUEST_SUCCESS = 'SAVE_QUEST_SUCCESS';
export const SAVE_QUEST_FAIL = 'SAVE_QUEST_FAIL';
export const DELETE_QUEST_SUCCESS = 'DELETE_QUEST_SUCCESS';
export const DELETE_QUEST_FAIL = 'DELETE_QUEST_FAIL';
export const REMOVE_QUEST = 'REMOVE_QUEST';
export const TOGGLE_QUEST_EDITOR = 'TOGGLE_QUEST_EDITOR';
export const CHANGE_SELECTED_QUEST = 'CHANGE_SELECTED_QUEST';

export function questsReducer(state: GameQuest = initialState, action: QuestAction): GameQuest {
    switch (action.type) {
        case ADD_QUEST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload
            };
        case REMOVE_QUEST:
            const items = { ...state.items };
            delete items[action.payload.id];
            return { ...state, items, lastDelete: action.payload };
        case SET_QUESTS:
            return {
                ...state,
                items: {
                    ...state.items,
                    ...action.payload
                }
            };
        case TOGGLE_QUEST_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_QUEST:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): GameQuest => state.form.quests);
export const selectQuests = createSelector(selectCurrentFeature, selectGame, (state, game: Game): Quest[] => {
    return state.items ? Object.values(state.items).filter(elem => elem.game === game.id) : [];
});
export const getSelectedQuest = createSelector(selectCurrentFeature, (state): Quest => state.selectedItem);
export const selectQuestEditorState = createSelector(selectCurrentFeature, (state): boolean => state.showEditor);

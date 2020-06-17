import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { EntityForm, formReducer } from './generics';
import { ContextState, contextReducer } from './contextReducer';
import { EditorGamesState, gamesReducer } from './gamesReducer';
import { editorMetaReducer } from './metaReducers';

export interface GameEditorFeature {
    form: EntityForm;
    context_overrides: ContextState;
    games: EditorGamesState;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
    context_overrides: contextReducer,
    games: gamesReducer,
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];


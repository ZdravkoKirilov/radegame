import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { EntityForm, formReducer } from './generics';
import { ContextState, contextReducer } from './contextReducer';
import { EditorGamesState, gamesReducer } from './gamesReducer';
import { editorMetaReducer } from './metaReducers';
import { EditorVersionState, versionsReducer } from './versions';
import { EditorLoaderState, loadersReducer } from './loadingReducer';

export interface GameEditorFeature {
    form: EntityForm;
    context_overrides: ContextState;
    games: EditorGamesState;
    versions: EditorVersionState;
    loaders: EditorLoaderState;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
    context_overrides: contextReducer,
    games: gamesReducer,
    versions: versionsReducer,
    loaders: loadersReducer,
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];


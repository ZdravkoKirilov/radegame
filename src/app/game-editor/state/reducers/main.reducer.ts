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
    context_overrides: contextReducer as any,
    games: gamesReducer as any,
    versions: versionsReducer as any,
    loaders: loadersReducer as any,
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer as any
];


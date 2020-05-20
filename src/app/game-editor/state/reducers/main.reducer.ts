import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { EntityForm, formReducer, editorMetaReducer } from './generics';
import { ContextState, contextReducer } from './contextReducer';

export interface GameEditorFeature {
    form: EntityForm;
    context_overrides: ContextState;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
    context_overrides: contextReducer,
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];


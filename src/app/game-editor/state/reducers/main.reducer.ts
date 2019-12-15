import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { EntityForm, formReducer, editorMetaReducer } from './generics';

export interface GameEditorFeature {
    form: EntityForm;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];


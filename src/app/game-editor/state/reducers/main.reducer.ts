import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { EntityForm, formReducer, metadataReducer, editorMetaReducer } from './generics';

export interface GameEditorFeature {
    form: EntityForm;
    metadata: EntityForm;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
    metadata: metadataReducer
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];


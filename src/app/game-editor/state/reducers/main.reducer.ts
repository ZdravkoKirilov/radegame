import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { GameEditorAssets, gameEditorAssetsReducer } from './byFeature';

import { EntityForm, formReducer, metadataReducer, editorMetaReducer } from './generics';

export interface GameEditorFeature {
    form: EntityForm;
    assets: GameEditorAssets;
    metadata: EntityForm;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
    assets: gameEditorAssetsReducer,
    metadata: metadataReducer
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];


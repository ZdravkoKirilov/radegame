import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { EntityForm, formReducer, editorMetaReducer } from './generics';
import { Dictionary } from '@app/shared';
import { ImageAsset, Slot, PathEntity, Style, Stage } from '@app/game-mechanics';

export interface GameEditorFeature {
    form: EntityForm;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: formReducer,
};

export const metaReducers: MetaReducer<any>[] = [
    editorMetaReducer
];

export type GameEntitiesDict = {
    images: Dictionary<ImageAsset>;
    slots: Dictionary<Slot>;
    paths: Dictionary<PathEntity>;
    styles: Dictionary<Style>;
    stages: Dictionary<Stage>;
}


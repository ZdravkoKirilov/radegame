import { ActionReducerMap } from '@ngrx/store';
import { GameEditorFeature } from '../models/index';
import { gameEditorFormReducer } from './byFeature/form';
import { gameEditorAssetsReducer } from './byFeature/assets';

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer,
    assets: gameEditorAssetsReducer
};

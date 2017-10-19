import { ActionReducerMap } from '@ngrx/store';
import { GameEditorFeature } from '../models/index';
import { gameEditorFormReducer } from './form';
import { gameEditorAssetsReducer } from './assets';

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer,
    assets: gameEditorAssetsReducer
};

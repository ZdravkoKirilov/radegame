import { ActionReducerMap } from '@ngrx/store';
import { GameEditorFeature } from '../models/index';
import { gameEditorFormReducer } from './byFeature/form';
import { gameEditorAssetsReducer } from './byFeature/assets';
import { gamesReducer } from './byFeature/games';

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer,
    assets: gameEditorAssetsReducer,
    games: gamesReducer
};

import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { GameEditorFeature } from '../../models/index';
import { gameEditorFormReducer } from './byFeature/form';
import { gameEditorAssetsReducer } from './byFeature/assets';
import { gamesReducer } from './byFeature/games';
import { gameEditorFormMetareducer } from './byFeature/form';

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer,
    assets: gameEditorAssetsReducer,
    games: gamesReducer
};

export const metaReducers: MetaReducer<any>[] = [
    gameEditorFormMetareducer
];

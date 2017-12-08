import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { GameEditorForm, gameEditorFormMetareducer, gameEditorFormReducer } from './byFeature/form.reducer';
import { GameEditorAssets, gameEditorAssetsReducer } from './byFeature/assets.reducer';
import { GamesList, gamesReducer } from './byFeature/games.reducer';

export interface GameEditorFeature {
    form: GameEditorForm;
    assets: GameEditorAssets;
    games: GamesList;
}

export const reducers: ActionReducerMap<GameEditorFeature> = {
    form: gameEditorFormReducer,
    assets: gameEditorAssetsReducer,
    games: gamesReducer
};

export const metaReducers: MetaReducer<any>[] = [
    gameEditorFormMetareducer
];


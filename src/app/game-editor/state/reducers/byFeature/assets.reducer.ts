import { Actions } from '../../actions/byFeature/asset.action';
import { PrivateActivityList } from '../../../../game-mechanics/systems/activity/statics';
import { Game, MovementsList } from '../../../../game-mechanics/models/index';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { Movement } from '../../../../game-mechanics/models/Movement.model';
import { selectFeature } from '../selectors';
import { Option } from '../../../../dynamic-forms/models/Base.model';

export interface GameEditorAssets {
    supportedMovements?: string[];
    supportedActions?: string[];
    activities?: PrivateActivityList;
    movements?: MovementsList;
    game?: Game;
}

const initialState: GameEditorAssets = {
    supportedMovements: [],
    supportedActions: [],
    activities: null,
    movements: null,
    game: null,
};

export const UPDATE_EDITOR_ASSET = 'UPDATE_EDITOR_ASSET';

export function gameEditorAssetsReducer(state: GameEditorAssets = initialState, action: Actions): GameEditorAssets {
    switch (action.type) {
        case UPDATE_EDITOR_ASSET:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const selectMovements = createSelector(selectFeature, (state: GameEditorFeature): Movement[] => {
    return state.assets.supportedMovements.map(elem => state.assets.movements[elem]);
});
export const selectGame = createSelector(selectFeature, (state: GameEditorFeature): Game => {
    return state.assets.game;
});
export const selectMovementsAsOptionsList = createSelector(selectMovements, (movements: Movement[]): Option[] => {
    return movements.map((elem: Movement) => ({label: elem.displayName, value: elem.id}));
});
export const selectBoardType = createSelector(selectGame, (game: Game): string => {
    return game ? game.boardType : null;
});
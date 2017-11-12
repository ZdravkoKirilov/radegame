import {FEATURE_NAME} from '../../configs/config';
import {GameEditorFeature} from '../../models/index';
import {createSelector, createFeatureSelector} from '@ngrx/store';
import {Option} from '../../../dynamic-forms/models/Base';
import {BoardField, BoardFieldList, MapFieldSettings, Grid, Movement, Game} from '../../../game-mechanics/models/index';
import {Map} from '../../models/index';

export const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

export const selectResources = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.resources.items ? Object.values(state.form.resources.items) : [];
});

export const selectCharacters = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.characters.items ? Object.values(state.form.characters.items) : [];
});

export const selectAbilities = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.assets.supportedAbilities.map(elem => state.assets.abilities[elem]);
});

export const selectMovements = createSelector(selectFeature, (state: GameEditorFeature): Movement[] => {
    return state.assets.supportedMovements.map(elem => state.assets.movements[elem]);
});

export const selectMovementsAsOptionsList = createSelector(selectMovements, (movements: Movement[]): Option[] => {
    return movements.map((elem: Movement) => ({label: elem.displayName, value: elem.id}));
});

export const selectTrivia = createSelector(selectFeature, (state: GameEditorFeature) => {
    return Object.keys(state.form.trivia.items);
});

export const selectFields = createSelector(selectFeature, (state: GameEditorFeature): BoardFieldList => {
    return state.form.fields.items;
});

export const selectFieldsAsArray = createSelector(selectFeature, (state: GameEditorFeature): BoardField[] => {
    return Object.values(state.form.fields.items);
});

export const selectFieldsGrid = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.grid;
});

export const selectGridWithInnerItems = createSelector(selectFieldsGrid, selectFields, (grid: Grid, items: BoardFieldList) => {
    return [...grid.matrix].map(innerArr => {
        return [...innerArr].map(elem => {
            return items[elem] || null;
        });
    });
});

export const selectGames = createSelector(selectFeature, (state: GameEditorFeature): Game[] => {
    return Object.values(state.games.items);
});

export const selectGamesIndexed = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.games.items;
});

export const selectGameById = function (gameId: number) {
    return createSelector(selectGamesIndexed, (games: any): Game => {
        return games[gameId];
    });
};

export const selectGame = createSelector(selectFeature, (state: GameEditorFeature): Game => {
    return state.assets.game;
});

export const selectBoardType = createSelector(selectGame, (game: Game): string => {
    return game ? game.boardType : null;
});

export const selectCanvasImage = createSelector(selectFeature, (state: GameEditorFeature): string => {
    return state.form.map.canvas.image;
});

export const selectCanvasItems = createSelector(selectFeature, (state: GameEditorFeature): { [key: string]: MapFieldSettings } => {
    return state.form.map.items;
});

export const selectFieldEditorToggleState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.fields.showFieldEditor;
});

export const getSelectedField = createSelector(selectFeature, (state: GameEditorFeature): BoardField => {
    return state.form.fields.items[state.form.fields.selectedField];
});

export const selectPathCreationMode = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.map.pathCreationMode;
});


import {FEATURE_NAME} from '../../configs/config';
import {GameEditorFeature} from '../models/index';
import {createSelector, createFeatureSelector} from '@ngrx/store';
import {Movement} from '../../../game-mechanics/models/Movement';
import {Option} from '../../../dynamic-forms/models/Base';

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

export const selectFields = createSelector(selectFeature, (state: GameEditorFeature) => {
    return Object.keys(state.form.fields.items);
});
export const selectFieldsGrid = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.fields.grid;
});


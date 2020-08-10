import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Version } from "@app/game-mechanics";
import { EditorVersionAction, versionActionTypes } from '../actions';

export type EditorVersionState = EntityState<Version>;

export const versionAdapter = createEntityAdapter<Version>({
  selectId: elem => elem.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = versionAdapter.getInitialState();


export const versionsReducer = (state: EditorVersionState = initialState, action: EditorVersionAction): EditorVersionState => {

  switch (action.type) {
    case versionActionTypes.SET_VERSION:
      return versionAdapter.upsertOne(action.payload.version, state);
    case versionActionTypes.REMOVE_VERSION:
      return versionAdapter.removeOne(action.payload.version.id, state);
    case versionActionTypes.SET_VERSIONS:
      return versionAdapter.addAll(action.payload.versions, state);
    default:
      return state;
  }
};

export const versionSelectors = versionAdapter.getSelectors();
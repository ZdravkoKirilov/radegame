import { Action } from '@ngrx/store';

import { Version, GameId, VersionId } from '@app/game-mechanics';

export const versionActionTypes = {
  SAVE_VERSION: '[Editor] SAVE_VERSION',
  SET_VERSION: '[Editor] SET_VERSION',

  DELETE_VERSION: '[Editor] DELETE_VERSION',
  REMOVE_VERSION: '[Editor] REMOVE_VERSION',

  FETCH_VERSIONS: '[Editor] FETCH_VERSIONS',
  SET_VERSIONS: '[Editor] SET_VERSIONS',

  FETCH_VERSION_DETAILS: '[Editor] FETCH_VERSION_DETAILS',
} as const;

export class SaveVersion implements Action {
  readonly type = versionActionTypes.SAVE_VERSION;
  constructor(public payload: { version: Version }) { }
};

export class SetVersion implements Action {
  readonly type = versionActionTypes.SET_VERSION;
  constructor(public payload: { version: Version }) { }
};

export class DeleteVersion implements Action {
  readonly type = versionActionTypes.DELETE_VERSION;
  constructor(public payload: { version: Version }) { }
};

export class RemoveVersion implements Action {
  readonly type = versionActionTypes.REMOVE_VERSION;
  constructor(public payload: { version: Version }) { }
};

export class FetchVersions implements Action {
  readonly type = versionActionTypes.FETCH_VERSIONS;
  constructor(public payload: { gameId: GameId }) { }
};

export class SetVersions implements Action {
  readonly type = versionActionTypes.SET_VERSIONS;
  constructor(public payload: { versions: Version[] }) { }
};

export class FetchVersionDetails implements Action {
  readonly type = versionActionTypes.FETCH_VERSION_DETAILS;
  constructor(public payload: { versionId: VersionId, gameId: GameId }) { }
};

export type EditorVersionAction = SaveVersion | SetVersion | DeleteVersion | RemoveVersion | FetchVersions | SetVersions | FetchVersionDetails;
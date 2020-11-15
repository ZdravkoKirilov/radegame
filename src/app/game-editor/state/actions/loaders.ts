import { Action } from '@ngrx/store';

import { ModuleId } from '@app/game-mechanics';

export const loaderActionTypes = {
  ADD_LOADED_MODULES: '[Editor] ADD_LOADED_MODULES',
} as const;

export class AddLoadedModules implements Action {
  readonly type = loaderActionTypes.ADD_LOADED_MODULES;
  constructor(public payload: { modules: ModuleId[] }) { }
};

export type EditorLoaderAction = AddLoadedModules;
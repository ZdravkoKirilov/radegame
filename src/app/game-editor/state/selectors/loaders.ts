import { createSelector } from "@ngrx/store";

import { selectFeature } from "./common";

const selectLoadersFeature = createSelector(
  selectFeature,
  feature => feature.loaders,
);

export const selectLoadedModules = createSelector(
  selectLoadersFeature,
  feature => feature.loaded_modules
);
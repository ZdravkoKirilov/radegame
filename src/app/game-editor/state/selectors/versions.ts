import { createSelector } from "@ngrx/store";

import { selectVersionId } from "@app/shared";
import { toVersionId } from "@app/game-mechanics";

import { selectFeature } from "./common";
import { versionSelectors } from "../reducers/versions";

const selectVersionFeature = createSelector(
  selectFeature,
  feature => feature.versions,
);

export const selectAllVersions = createSelector(
  selectVersionFeature,
  versionSelectors.selectAll,
);

export const selectVersion = createSelector(
  selectAllVersions,
  selectVersionId,
  (versions, id) => {
    return versions.find(elem => elem.id == toVersionId(id));
  }
);
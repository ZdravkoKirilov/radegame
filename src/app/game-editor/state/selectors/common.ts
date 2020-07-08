import { createFeatureSelector } from "@ngrx/store";

import { GameEditorFeature } from "../reducers";
import { FEATURE_NAME } from "../../utils";

export const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);
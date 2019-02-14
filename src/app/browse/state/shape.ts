import { Dictionary } from "@app/shared";
import { Game } from "@app/game-mechanics";

export type BrowseFeatureState = {
    items: Dictionary<Game>;
    error: boolean;
    loading: boolean;
};

export const initialState: BrowseFeatureState = {
    items: {},
    error: false,
    loading: false,
};
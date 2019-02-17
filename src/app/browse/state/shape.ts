import { Dictionary } from "@app/shared";
import { Game, ImageAsset } from "@app/game-mechanics";

export type BrowseFeatureState = {
    items: Dictionary<Game>;
    images: Dictionary<ImageAsset>;
    error: boolean;
    loading: boolean;
};

export const initialState: BrowseFeatureState = {
    items: {},
    error: false,
    loading: false,
    images: {},
};
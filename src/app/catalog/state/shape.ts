import { Dictionary } from "@app/shared";
import { Game, ImageAsset } from "@app/game-mechanics";

export type CatalogFeatureState = {
    items: Dictionary<Game>;
    images: Dictionary<ImageAsset>;
    error: boolean;
    loading: boolean;
};

export const initialState: CatalogFeatureState = {
    items: {},
    error: false,
    loading: false,
    images: {},
};
export type LobbyFeatureState = {
    selectedSetup: number;
    error: boolean;
    loading: boolean;
};

export const initialState: LobbyFeatureState = {
    error: false,
    loading: false,
    selectedSetup: null,
};
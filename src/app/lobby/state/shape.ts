export type LobbyFeatureState = {
    showForm: boolean;
    error: boolean;
    loading: boolean;
};

export const initialState: LobbyFeatureState = {
    error: false,
    loading: false,
    showForm: false,
};
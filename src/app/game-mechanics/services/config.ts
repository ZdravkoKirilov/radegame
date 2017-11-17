export const ROUTER_PARAMS = {
    GAME_ID: 'GAME_ID'
};

const BASE_URL = 'http://localhost:8000/api/v1';  // Django REST

export const API_URLS = {
    GAMES: `${BASE_URL}/games/`,
    FIELDS: (gameId: number, fieldId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/fields/`;
        return fieldId ? `${base}${fieldId}/` : base;
    },
    LOCATIONS: (gameId: number, locId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/locations/`;
        return locId ? `${base}${locId}/` : base;
    },
    PATHS: (gameId: number, pathId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/paths/`;
        return pathId ? `${base}${pathId}/` : base;
    },
    MAPS: (gameId: number, mapId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/maps/`;
        return mapId ? `${base}${mapId}/` : base;
    },
};

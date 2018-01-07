const BASE_URL = 'http://localhost:8000/api/v1';  // Django REST

export const API_URLS = {
    GAMES: `${BASE_URL}/games/`,
    FIELDS: (gameId: number, fieldId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/fields/`;
        return fieldId ? `${base}${fieldId}/` : base;
    },
    ACTIVITIES: (gameId: number, activityId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/actions/`;
        return activityId ? `${base}${activityId}/` : base;
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
    RESOURCES: (gameId: number, resourceId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/resources/`;
        return resourceId ? `${base}${resourceId}/` : base;
    },
    FACTIONS: (gameId: number, factionId?: number) => {
        const base = `${BASE_URL}/games/${gameId}/factions/`;
        return factionId ? `${base}${factionId}/` : base;
    },
};
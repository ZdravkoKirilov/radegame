const BASE_URL = 'http://localhost:8000';  // Django REST
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const API_URLS = {
    GAMES: (gameId?: number) => {
        const base = `${API_BASE_URL}/games/`;
        return gameId ? `${base}${gameId}/` : base;
    },
    FIELDS: (gameId: number, fieldId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/fields/`;
        return fieldId ? `${base}${fieldId}/` : base;
    },
    ACTIVITIES: (gameId: number, activityId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/actions/`;
        return activityId ? `${base}${activityId}/` : base;
    },
    LOCATIONS: (gameId: number, locId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/locations/`;
        return locId ? `${base}${locId}/` : base;
    },
    PATHS: (gameId: number, pathId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/paths/`;
        return pathId ? `${base}${pathId}/` : base;
    },
    MAPS: (gameId: number, mapId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/maps/`;
        return mapId ? `${base}${mapId}/` : base;
    },
    RESOURCES: (gameId: number, resourceId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/resources/`;
        return resourceId ? `${base}${resourceId}/` : base;
    },
    FACTIONS: (gameId: number, factionId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/factions/`;
        return factionId ? `${base}${factionId}/` : base;
    },
    QUESTS: (gameId: number, questId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/quests/`;
        return questId ? `${base}${questId}/` : base;
    },
    ROUNDS: (gameId: number, roundId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/rounds/`;
        return roundId ? `${base}${roundId}/` : base;
    },
    TRIVIA: (gameId: number, triviaId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/trivia/`;
        return triviaId ? `${base}${triviaId}/` : base;
    },
    STAGES: (gameId: number, stageId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/stages/`;
        return stageId ? `${base}${stageId}/` : base;
    },
};

export const AUTH_URLS = {
    EMAIL_REGISTER: BASE_URL + '/auth/local/register',
    EMAIL_LOGIN: BASE_URL + '/auth/local/login',
    CURRENT_USER: BASE_URL + '/auth/users/current'
}

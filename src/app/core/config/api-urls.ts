import { environment } from '../../../environments/environment';

const { API_BASE_URL, BASE_URL, WS_BROWSE_LOBBIES_BASE_URL } = environment;

export const LOBBY_URLS = {
    LOBBIES: (lobbyName?: string) => {
        const base = `${API_BASE_URL}/lobbies/`;
        return lobbyName ? `${base}${lobbyName}` : base;
    },
    PLAYERS: (lobbyName: string, playerName?: string) => {
        const base = `${API_BASE_URL}/lobbies/${lobbyName}/players`;
        return playerName ? `${base}/${playerName}/` : base;
    },
    ALL_PLAYERS: API_BASE_URL + '/all_players',
    LIVE_LOBBIES: (lobbyName?: string) => {
        return lobbyName ? `${WS_BROWSE_LOBBIES_BASE_URL}/${lobbyName}/` : WS_BROWSE_LOBBIES_BASE_URL;
    },
    CREATE_GAME: (lobbyName: string) => {
        const base = `${API_BASE_URL}/lobbies`;
        return `${base}/${lobbyName}/create`;
    },
};

export const API_URLS = {
    GAMES: (gameId?: number) => {
        const base = `${API_BASE_URL}/games/`;
        return gameId ? `${base}${gameId}/` : base;
    },
    GAME_DATA: (gameId: number) => {
        return `${API_BASE_URL}/games/${gameId}/data`;
    },
    FIELDS: (gameId: number, fieldId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/fields/`;
        return fieldId ? `${base}${fieldId}/` : base;
    },
    ACTIONS: (gameId: number, actionId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/actions/`;
        return actionId ? `${base}${actionId}/` : base;
    },
    SLOTS: (gameId: number, locId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/slots/`;
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
    FACTIONS: (gameId: number, factionId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/factions/`;
        return factionId ? `${base}${factionId}/` : base;
    },
    CONDITIONS: (gameId: number, conditionId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/conditions/`;
        return conditionId ? `${base}${conditionId}/` : base;
    },
    ROUNDS: (gameId: number, roundId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/rounds/`;
        return roundId ? `${base}${roundId}/` : base;
    },
    CHOICES: (gameId: number, choiceId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/choices/`;
        return choiceId ? `${base}${choiceId}/` : base;
    },
    STAGES: (gameId: number, stageId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/stages/`;
        return stageId ? `${base}${stageId}/` : base;
    },
    TOKENS: (gameId: number, tokenId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/tokens/`;
        return tokenId ? `${base}${tokenId}/` : base;
    },
    PHASES: (gameId: number, phaseId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/phases/`;
        return phaseId ? `${base}${phaseId}/` : base;
    },
    TEAMS: (gameId: number, teamId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/teams/`;
        return teamId ? `${base}${teamId}/` : base;
    },
    IMAGES: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/imageassets/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    KEYWORDS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/keywords/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    STYLES: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/styles/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SOUNDS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/sounds/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    STATES: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/states/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    EXPRESSIONS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/expressions/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    ANIMATIONS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/animations/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    HANDLERS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/handlers/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SETUPS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/setups/`;
        return itemId ? `${base}${itemId}/` : base;
    },
};

export const AUTH_URLS = {
    EMAIL_REGISTER: BASE_URL + '/auth/local/register',
    EMAIL_LOGIN: BASE_URL + '/auth/local/login',
    CURRENT_USER: BASE_URL + '/auth/users/current'
};

export const ARENA_URLS = {
    GET_ACTIVE_GAMES: (userId: number) => {
        return API_BASE_URL + `/arena/active/${userId}`;
    },
};

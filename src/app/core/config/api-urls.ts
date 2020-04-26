import { environment } from '../../../environments/environment';

const { API_BASE_URL, BASE_URL, WS_BROWSE_LOBBIES_BASE_URL, WS_ARENA_BASE_URL } = environment;

export const LOBBY_URLS = {

    LIVE_LOBBIES: (gameId: number, lobbyName?: string) => {
        const base = `${WS_BROWSE_LOBBIES_BASE_URL}/${gameId}`;
        return lobbyName ? `${base}/${lobbyName}/` : base;
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
    GAME_DATA: (gameId: number, query = '') => {
        return `${API_BASE_URL}/games/${gameId}/data` + (query ? '?' + query : '');
    },
    TEXTS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/texts/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SHAPES: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/shapes/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SONATAS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/sonatas/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    FACTIONS: (gameId: number, factionId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/factions/`;
        return factionId ? `${base}${factionId}/` : base;
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
    SLOTS: (gameId: number, stageId: number, slotId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/stages/${stageId}/slots/`;
        return slotId ? `${base}${slotId}/` : base;
    },
    TOKENS: (gameId: number, tokenId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/tokens/`;
        return tokenId ? `${base}${tokenId}/` : base;
    },
    IMAGES: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/imageassets/`;
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
    TRANSITIONS: (gameId: number, itemId?: number) => {
        const base = `${API_BASE_URL}/games/${gameId}/transitions/`;
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
        return API_BASE_URL + `/arena/active-games/${userId}`;
    },
    ACTIVE_GAME: (publicGameId: number) => {
        return API_BASE_URL + `/arena/active-game/${publicGameId}`;
    },
    LIVE_ARENA: (game_name: string) => {
        return WS_ARENA_BASE_URL + '/' + game_name;
    },
};

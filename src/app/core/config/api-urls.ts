import { GameId, VersionId, TextId, ShapeId, SonataId, SandboxId, TransitionId, WidgetId, WidgetNodeId, ModuleId, ChoiceId, TokenId, ImageAssetId, StyleId, SoundId, ExpressionId, AnimationId, SetupId } from '@app/game-mechanics';

import { environment } from '../../../environments/environment';
import { UserId } from '../models';

const { API_BASE_URL, BASE_URL, WS_BROWSE_LOBBIES_BASE_URL, WS_ARENA_BASE_URL } = environment;

export const LOBBY_URLS = {

    LIVE_LOBBIES: (gameId: GameId, lobbyName?: string) => {
        const base = `${WS_BROWSE_LOBBIES_BASE_URL}/${gameId}`;
        return lobbyName ? `${base}/${lobbyName}/` : base;
    },
    CREATE_GAME: (lobbyName: string) => {
        const base = `${API_BASE_URL}/lobbies`;
        return `${base}/${lobbyName}/create`;
    },
};

export const EDITOR_URLS = {
    GAMES: (gameId?: GameId) => {
        const base = `${API_BASE_URL}/games/`;
        return gameId ? `${base}${gameId}/` : base;
    },
    VERSIONS: (gameId: GameId, versionId?: VersionId) => {
        const base = `${API_BASE_URL}/games/${gameId}/versions/`;
        return versionId ? `${base}${versionId}/` : base;
    },
    GAME_DATA: (gameId: GameId, query = '') => {
        return `${API_BASE_URL}/games/${gameId}/data` + (query ? '?' + query : '');
    },
    TEXTS: (gameId: GameId, textId?: TextId) => {
        const base = `${API_BASE_URL}/games/${gameId}/texts/`;
        return textId ? `${base}${textId}/` : base;
    },
    SHAPES: (gameId: GameId, shapeId?: ShapeId) => {
        const base = `${API_BASE_URL}/games/${gameId}/shapes/`;
        return shapeId ? `${base}${shapeId}/` : base;
    },
    SONATAS: (gameId: GameId, itemId?: SonataId) => {
        const base = `${API_BASE_URL}/games/${gameId}/sonatas/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    MODULES: (gameId: GameId, moduleId?: ModuleId) => {
        const base = `${API_BASE_URL}/games/${gameId}/modules/`;
        return moduleId ? `${base}${moduleId}/` : base;
    },
    SANDBOXES: (gameId: GameId, sandboxId?: SandboxId) => {
        const base = `${API_BASE_URL}/games/${gameId}/sandboxes/`;
        return sandboxId ? `${base}${sandboxId}/` : base;
    },
    CHOICES: (gameId: GameId, choiceId?: ChoiceId) => {
        const base = `${API_BASE_URL}/games/${gameId}/choices/`;
        return choiceId ? `${base}${choiceId}/` : base;
    },
    WIDGETS: (gameId: GameId, widgetId?: WidgetId) => {
        const base = `${API_BASE_URL}/games/${gameId}/widgets/`;
        return widgetId ? `${base}${widgetId}/` : base;
    },
    NODES: (gameId: GameId, widgetId: WidgetId, nodeId?: WidgetNodeId) => {
        const base = `${API_BASE_URL}/games/${gameId}/widgets/${widgetId}/nodes/`;
        return nodeId ? `${base}${nodeId}/` : base;
    },
    TOKENS: (gameId: GameId, tokenId?: TokenId) => {
        const base = `${API_BASE_URL}/games/${gameId}/tokens/`;
        return tokenId ? `${base}${tokenId}/` : base;
    },
    IMAGES: (gameId: GameId, itemId?: ImageAssetId) => {
        const base = `${API_BASE_URL}/games/${gameId}/imageassets/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    STYLES: (gameId: GameId, itemId?: StyleId) => {
        const base = `${API_BASE_URL}/games/${gameId}/styles/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SOUNDS: (gameId: GameId, itemId?: SoundId) => {
        const base = `${API_BASE_URL}/games/${gameId}/sounds/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    TRANSITIONS: (gameId: GameId, itemId?: TransitionId) => {
        const base = `${API_BASE_URL}/games/${gameId}/transitions/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    EXPRESSIONS: (gameId: GameId, itemId?: ExpressionId) => {
        const base = `${API_BASE_URL}/games/${gameId}/expressions/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    ANIMATIONS: (gameId: GameId, itemId?: AnimationId) => {
        const base = `${API_BASE_URL}/games/${gameId}/animations/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SETUPS: (gameId: GameId, itemId?: SetupId) => {
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
    GET_ACTIVE_GAMES: (userId: UserId) => {
        return API_BASE_URL + `/arena/active-games/${userId}`;
    },
    ACTIVE_GAME: (publicGameId: GameId) => {
        return API_BASE_URL + `/arena/active-game/${publicGameId}`;
    },
    LIVE_ARENA: (game_name: string) => {
        return WS_ARENA_BASE_URL + '/' + game_name;
    },
};

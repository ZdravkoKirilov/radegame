import { GameId, VersionId, TextId, ShapeId, SonataId, SandboxId, WidgetId, WidgetNodeId, ModuleId, TokenId, ImageAssetId, StyleId, SoundId, ExpressionId, AnimationId, SetupId } from '@app/game-mechanics';

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
    SETUPS: (versionId: VersionId, itemId?: SetupId) => {
        const base = `${API_BASE_URL}/versions/${versionId}/setups/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    MODULES: (versionId: VersionId, moduleId?: ModuleId) => {
        const base = `${API_BASE_URL}/versions/${versionId}/modules/`;
        return moduleId ? `${base}${moduleId}/` : base;
    },
    GAME_DATA: (gameId: GameId, modules: ModuleId[]) => {
        return `${API_BASE_URL}/games/${gameId}/data`;
    },

    
    TEXTS: (moduleId: ModuleId, textId?: TextId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/texts/`;
        return textId ? `${base}${textId}/` : base;
    },
    SHAPES: (moduleId: ModuleId, shapeId?: ShapeId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/shapes/`;
        return shapeId ? `${base}${shapeId}/` : base;
    },
    SONATAS: (moduleId: ModuleId, itemId?: SonataId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/sonatas/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SANDBOXES: (moduleId: ModuleId, sandboxId?: SandboxId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/sandboxes/`;
        return sandboxId ? `${base}${sandboxId}/` : base;
    },
    WIDGETS: (moduleId: ModuleId, widgetId?: WidgetId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/widgets/`;
        return widgetId ? `${base}${widgetId}/` : base;
    },
    NODES: (widgetId: WidgetId, nodeId?: WidgetNodeId) => {
        const base = `${API_BASE_URL}/widgets/${widgetId}/nodes/`;
        return nodeId ? `${base}${nodeId}/` : base;
    },
    TOKENS: (moduleId: ModuleId, tokenId?: TokenId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/tokens/`;
        return tokenId ? `${base}${tokenId}/` : base;
    },
    IMAGES: (moduleId: ModuleId, itemId?: ImageAssetId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/imageassets/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    STYLES: (moduleId: ModuleId, itemId?: StyleId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/styles/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    SOUNDS: (moduleId: ModuleId, itemId?: SoundId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/sounds/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    EXPRESSIONS: (moduleId: ModuleId, itemId?: ExpressionId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/expressions/`;
        return itemId ? `${base}${itemId}/` : base;
    },
    ANIMATIONS: (moduleId: ModuleId, itemId?: AnimationId) => {
        const base = `${API_BASE_URL}/modules/${moduleId}/animations/`;
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
    ACTIVE_GAME: (gameId: GameId) => {
        return API_BASE_URL + `/arena/active-game/${gameId}`;
    },
    LIVE_ARENA: (game_name: string) => {
        return WS_ARENA_BASE_URL + '/' + game_name;
    },
};

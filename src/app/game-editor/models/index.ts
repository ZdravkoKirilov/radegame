import {
    GameBoardTypes,
    Game,
    AbilityList,
    MovementsList,
    GameMetadata,
    Resource,
    Character,
    Trivia,
    BoardField,
    MapFieldSettings,
    MapPath,
    Grid
} from '../../game-mechanics/models/index';
import {boardTypes} from '../../game-mechanics/configs/game-boards';

export interface GamesList {
    items: {
        [key: string]: Game
    };
    lastInsert?: Game;
}

export interface GameEditorAssets {
    supportedMovements?: string[];
    supportedAbilities?: string[];
    gameBoards?: GameBoardTypes;
    abilities?: AbilityList;
    movements?: MovementsList;
    boardType?: boardTypes;
}

export interface GridFieldPayload {
    coords?: FieldCoord;
    data: BoardField;
}

export interface BoardFields {
    items?: {
        [key: string]: BoardField
    };
    lastInsert?: number;
    lastDelete?: BoardField;
    showFieldEditor?: boolean;
    selectedField?: number;
}

export interface Map {
    canvas?: {
        image?: string;
    };
    items?: { [key: string]: MapFieldSettings };
    paths?: { [key: string]: MapPath };
    siblingsList?: { [key: string]: number[] };
    lastInsert?: number;
    lastDelete?: MapFieldSettings;
    pathCreationMode?: boolean;
}

export interface Characters {
    items?: {
        [key: string]: Character
    };
    lastInsert?: Character;
}

export interface Resources {
    items?: {
        [key: string]: Resource;
    };
    lastInsert?: Resource;
}

export interface Trivias {
    items?: {
        [key: string]: Trivia
    };
    lastInsert?: Trivia;
}

export interface GameEditorForm {
    metadata?: GameMetadata;
    resources?: Resources;
    characters?: Characters;
    trivia?: Trivias;
    fields?: BoardFields;
    map?: Map;
    grid?: Grid;
}

export interface GameEditorFeature {
    form: GameEditorForm;
    assets: GameEditorAssets;
    games: GamesList;
}

export interface FieldCoord {
    x: number;
    y: number;
}

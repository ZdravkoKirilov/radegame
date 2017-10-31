import {
    GameBoardTypes,
    Game,
    AbilityList,
    MovementsList,
    GameMetadata,
    Resource,
    Character,
    Trivia,
    BoardField
} from '../../game-mechanics/models/index';
import { Grid } from '../../game-mechanics/models/BoardField';

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
}

export interface GridFieldPayload {
    coords?: FieldCoord;
    data: BoardField;
}

export interface BoardFields {
    items?: {
        [key: string]: BoardField
    };
    grid?: Grid;
    lastInsert?: BoardField;
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

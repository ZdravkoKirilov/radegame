import {
    GameBoardTypes,
    Game,
    ActionList,
    MovementsList,
    GameMetadata,
    Resource,
    Character,
    Trivia,
    BoardField,
    MapLocation,
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
    supportedActions?: string[];
    actions?: ActionList;
    movements?: MovementsList;
    game?: Game;
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

export interface MapState {
    canvas?: {
        image?: string;
        id?: number;
        game?: number;
    };
    items?: { [key: string]: MapLocation };
    paths?: { [key: string]: MapPath };
    siblingsList?: { [key: string]: number[] };
    lastInsert?: number;
    lastDelete?: MapLocation;
    pathCreationMode?: boolean;
    selectedPath?: number;
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
    lastDelete?: Resource;
    showEditor?: boolean;
    selectedItem?: Resource;
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
    map?: MapState;
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

import {
    Game,
    ActionList,
    MovementsList,
    GameMetadata,
    Resource,
    Faction,
    Trivia,
    BoardField,
    MapLocation,
    MapPath,
    Grid
} from '../../game-mechanics/models/index';

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

export interface Factions {
    items?: {
        [key: string]: Faction
    };
    lastInsert?: Faction;
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
    factions?: Factions;
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

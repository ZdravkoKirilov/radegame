import {
    GameBoardTypes,
    AbilityList,
    MovementsList,
    GameMetadata,
    Resource,
    Character,
    Trivia
} from '../../../game-mechanics/models/index';

export interface GameEditorAssets {
    supportedMovements?: string[];
    supportedAbilities?: string[];
    gameBoards?: GameBoardTypes;
    abilities?: AbilityList;
    movements?: MovementsList;
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
}

export interface GameEditorFeature {
    form: GameEditorForm;
    assets: GameEditorAssets;
}

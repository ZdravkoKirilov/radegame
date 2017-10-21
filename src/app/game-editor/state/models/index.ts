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

export interface GameEditorFeature {
    form: {
        metadata?: GameMetadata;
        resources?: {
            items?: {
                [key: string]: Resource;
            };
            lastInsert?: Resource;
        };
        characters?: {
            items?: {
                [key: string]: Character;
            };
            lastInsert?: Character;
        };
        trivia?: {
            items?: {
                [key: string]: Trivia
            };
            lastInsert?: Trivia;
        }
    };
    assets: GameEditorAssets;
}

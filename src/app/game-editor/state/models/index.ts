import { GameTemplate, GameBoardTypes, AbilityList, MovementsList } from '../../../game-mechanics/models/index';

export interface GameEditorAssets {
    supportedMovements?: string[];
    supportedAbilities?: string[];
    gameBoards?: GameBoardTypes;
    abilities?: AbilityList;
    movements?: MovementsList;
}

export interface GameEditorFeature {
    form: GameTemplate;
    assets: GameEditorAssets;
}

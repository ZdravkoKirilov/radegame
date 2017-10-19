import { GameTemplate } from '../../../game-mechanics/models/GameTemplate';

export interface GameEditorAssets {
    supportedMovements?: string[];
    supportedAbilities?: string[];
}

export interface GameEditorFeature {
    form: GameTemplate;
    assets: GameEditorAssets;
}

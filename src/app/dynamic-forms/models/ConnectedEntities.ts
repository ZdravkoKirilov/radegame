import {
    ImageAsset, Module, Widget, Token, Setup, Style, Sound, Expression, Animation, GameLanguage, Text, Game, Shape,
} from '@app/game-mechanics';

export type ConnectedEntities = {
    tokens: Token[];
    modules: Module[];
    widgets: Widget[];
    setups: Setup[];
    images: ImageAsset[];
    styles: Style[];
    sounds: Sound[];
    expressions: Expression[];
    animations: Animation[];
    languages: GameLanguage[];
    texts: Text[];
    games: Game[];
    shapes: Shape[];
};

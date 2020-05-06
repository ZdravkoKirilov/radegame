import {
    ImageAsset, Round, Widget, Choice, Token, Setup, Style, Sound, Expression, Animation, Transition, GameLanguage, Text, Game, Shape,
} from '@app/game-mechanics';

export type ConnectedEntities = Partial<{
    tokens: Token[];
    rounds: Round[];
    widgets: Widget[];
    choices: Choice[];
    setups: Setup[];
    images: ImageAsset[];
    styles: Style[];
    sounds: Sound[];
    expressions: Expression[];
    animations: Animation[];
    transitions: Transition[];
    languages: GameLanguage[];
    texts: Text[];
    games: Game[];
    shapes: Shape[];
}>

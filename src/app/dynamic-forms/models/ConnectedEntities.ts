import {
    Faction, Condition, ImageAsset,
    GameAction, Round, Stage, Choice, Slot, PathEntity, Token, Phase, Setup, Keyword, Style, Sound, Expression, Animation, Handler, Transition, GameLanguage, Text, Game, Shape,
} from '@app/game-mechanics';

export type ConnectedEntities = Partial<{
    factions: Faction[];
    tokens: Token[];
    conditions: Condition[];
    actions: GameAction[];
    rounds: Round[];
    phases: Phase[];
    stages: Stage[];
    choices: Choice[];
    paths: PathEntity[];
    setups: Setup[];
    slots: Slot[];
    images: ImageAsset[];
    keywords: Keyword[];
    styles: Style[];
    sounds: Sound[];
    expressions: Expression[];
    animations: Animation[];
    transitions: Transition[];
    handlers: Handler[];
    languages: GameLanguage[];
    texts: Text[];
    games: Game[];
    shapes: Shape[];
}>

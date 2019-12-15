import {
    Faction, Condition, ImageAsset,
    GameAction, Round, Stage, Choice, Slot, Token, Phase, Setup, Style, Sound, Expression, Animation, Transition, GameLanguage, Text, Game, Shape,
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
    setups: Setup[];
    slots: Slot[];
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

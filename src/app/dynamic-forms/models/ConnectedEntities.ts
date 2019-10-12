import {
    Field, Faction, Condition, ImageAsset,
    GameAction, Round, Stage, Choice, Slot, PathEntity, Token, Phase, Setup, Team, Keyword, Style, Sound, EntityState, Expression, Animation, Handler, Transition, GameLanguage, Text, Game,
} from '@app/game-mechanics';

export type ConnectedEntities = Partial<{
    fields: Field[];
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
    teams: Team[];
    images: ImageAsset[];
    keywords: Keyword[];
    styles: Style[];
    sounds: Sound[];
    states: EntityState[];
    expressions: Expression[];
    animations: Animation[];
    transitions: Transition[];
    handlers: Handler[];
    languages: GameLanguage[];
    texts: Text[];
    games: Game[];
}>

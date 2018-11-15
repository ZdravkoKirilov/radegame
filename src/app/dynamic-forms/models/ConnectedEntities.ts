import {
 Field, Faction, Condition,
    GameAction, Round, Stage, Choice, Slot, PathEntity, Token, Phase, Edition, Source, Team
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
    editions: Edition[];
    sources: Source[];
    slots: Slot[];
    teams: Team[];
}>

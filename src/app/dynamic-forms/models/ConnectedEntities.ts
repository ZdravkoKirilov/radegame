import {
 Field, Faction, Condition,
    GameAction, Round, Stage, Choice, Slot, PathEntity, Token, Phase
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
    locations: Slot[];
    paths: PathEntity[];
}>

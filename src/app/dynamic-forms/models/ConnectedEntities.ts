import {
    Resource, Field, Faction, Condition, Stack, Pool,
    GameAction, Round, Stage, Choice, LocationEntity, PathEntity, Token, Phase
} from '@app/game-mechanics';

export type ConnectedEntities = Partial<{
    resources: Resource[];
    fields: Field[];
    factions: Faction[];
    tokens: Token[];
    conditions: Condition[];
    actions: GameAction[];
    rounds: Round[];
    phases: Phase[];
    stages: Stage[];
    choices: Choice[];
    locations: LocationEntity[];
    paths: PathEntity[];
    stacks: Stack[];
    pools: Pool[];
}>

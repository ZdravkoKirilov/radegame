import {
    Resource, Field, Faction, Condition, Stack, Pool,
    GameAction, Round, Stage, Choice, StageLocation, StagePath, Token
} from '@app/game-mechanics';

export type ConnectedEntities = Partial<{
    resources: Resource[];
    fields: Field[];
    factions: Faction[];
    tokens: Token[];
    conditions: Condition[];
    actions: GameAction[];
    rounds: Round[];
    stages: Stage[];
    choices: Choice[];
    locations: StageLocation[];
    paths: StagePath[];
    stacks: Stack[];
    pools: Pool[];
}>

import {
    Resource, Field, Faction, Condition, Stack, Pool,
    GameAction, Round, Stage, Choice, MapLocation, MapPath
} from '@app/game-mechanics';

export type ConnectedEntities = Partial<{
    resources: Resource[];
    fields: Field[];
    factions: Faction[];
    conditions: Condition[];
    actions: GameAction[];
    rounds: Round[];
    stages: Stage[];
    choices: Choice[];
    locations: MapLocation[];
    paths: MapPath[];
    stacks: Stack[];
    pools: Pool[];
}>

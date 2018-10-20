import {
    Resource, Field, Faction, Condition,
    GameAction, Round, Stage, Choice, MapLocation, MapPath
} from '@app/game-mechanics';

export interface ConnectedEntities {
    resources?: Resource[];
    fields?: Field[];
    factions?: Faction[];
    conditions?: Condition[];
    actions?: GameAction[];
    rounds?: Round[];
    stages?: Stage[];
    choices?: Choice[];
    locations?: MapLocation[];
    paths?: MapPath[];
}

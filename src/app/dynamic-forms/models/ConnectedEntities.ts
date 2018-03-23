import { Resource, Field, Faction, Quest, Activity, Round, Stage } from '../../game-mechanics';

export interface ConnectedEntities {
    resources?: Resource[];
    fields?: Field[];
    factions?: Faction[];
    quests?: Quest[];
    activities?: Activity[];
    rounds?: Round[];
    stages?: Stage[];
}

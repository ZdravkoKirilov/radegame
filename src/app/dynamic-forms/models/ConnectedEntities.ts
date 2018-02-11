import { Resource, Field, Faction, Quest, Activity, Round } from '../../game-mechanics/models/index';

export interface ConnectedEntities {
    resources?: Resource[];
    fields?: Field[];
    factions?: Faction[];
    quests?: Quest[];
    activities?: Activity[];
    rounds?: Round[];
}

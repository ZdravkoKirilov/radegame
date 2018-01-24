import { Resource, BoardField, Faction, Quest, Activity } from '../../game-mechanics/models/index';

export interface ConnectedEntities {
    resources?: Resource[];
    fields?: BoardField[];
    factions?: Faction[];
    quests?: Quest[];
    activities?: Activity[];
}

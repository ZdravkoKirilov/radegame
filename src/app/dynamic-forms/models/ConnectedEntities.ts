import { Resource, BoardField, Faction } from '../../game-mechanics/models/index';

export interface ConnectedEntities {
    resources?: Resource[];
    fields?: BoardField[];
    factions?: Faction[];
}

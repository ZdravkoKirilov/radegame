import { Movement } from './Movement';
import { TriviaList } from './Trivia';
import { ResourceList } from './Resource';
import { FactionList } from './Faction';
import { ActionList } from './GameAction';
import { EndCondition } from './EndCondition';
import { GameMetadata } from './GameMetadata';

export interface GameTemplate {
    id?: number;
    metadata?: GameMetadata;
    movements?: Movement;
    endCondition?: EndCondition;
    trivia?: TriviaList;
    resources?: ResourceList;
    factions?: FactionList;
    abilities?: ActionList;
}

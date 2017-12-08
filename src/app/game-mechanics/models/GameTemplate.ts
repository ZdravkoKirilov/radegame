import { Movement, TriviaList, ResourceList, FactionList, EndCondition, GameMetadata } from './index';

export interface GameTemplate {
    id?: number;
    metadata?: GameMetadata;
    movements?: Movement;
    endCondition?: EndCondition;
    trivia?: TriviaList;
    resources?: ResourceList;
    factions?: FactionList;
}

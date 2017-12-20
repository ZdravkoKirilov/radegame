import { Movement, TriviaList, ResourceList, FactionList, EndCondition, GameMetadata, ActivityList } from './index';

export interface GameTemplate {
    id?: number;
    metadata?: GameMetadata;
    movements?: Movement;
    endCondition?: EndCondition;
    trivia?: TriviaList;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: ActivityList;
}

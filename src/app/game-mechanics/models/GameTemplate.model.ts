import { Movement, TriviaList, ResourceList, FactionList, Termination, GameMetadata, ActivityList } from './index';

export interface GameTemplate {
    id?: number;
    metadata?: GameMetadata;
    movements?: Movement;
    endCondition?: Termination;
    trivia?: TriviaList;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: ActivityList;
}
import { GameAction } from './GameAction.model';

export abstract class Generator {
    abstract lastOperation: Resolver;
    abstract operationsWithInput: any[];
    abstract inputIsAllowed(): boolean;
    abstract next(input?: any, state?: any): GameAction[];
    abstract queue: Resolver;
    abstract isFull: boolean;
    abstract items: Resolver[];
}

export type Resolver = <T>(action: GameAction, state: T) => ResolverResult;

export type ResolverResult = {
    actions: GameAction[];
    callback?: Resolver;
}
import { GameAction } from './GameAction.model';

export abstract class Generator {
    abstract lastOperation: Resolver;
    abstract delayedResolvers: any[];
    abstract queue: Resolver;
    abstract isFull: boolean;
    abstract items: Resolver[];

    abstract inputIsAllowed(): boolean;
    abstract next(input?: any, state?: any): GameAction[];
}

export type Resolver = <T>(action: GameAction, state: T) => ResolverResult;

export type ResolverResult = {
    actions: GameAction[];
    nextResolver?: Resolver;
}
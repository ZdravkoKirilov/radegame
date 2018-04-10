import { GameAction } from './GameAction.model';

export type ResolverFunction = <T>(action?: GameAction, state?: T) => ResolverResult;

export type Resolver = {
    name: string;
    call: ResolverFunction;
}

export type ResolverResult = {
    actions: GameAction[]; // redux actions
    nextResolvers?: Resolver[];
    clear?: boolean;
    clearQueue?: boolean;
}
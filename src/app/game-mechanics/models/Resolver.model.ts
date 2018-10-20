import { PlayerAction } from './GameAction.model';

export type ResolverFunction = <T>(action?: PlayerAction, state?: T) => ResolverResult;

export type Resolver = {
    name: string;
    call: ResolverFunction;
}

export type ResolverResult = {
    actions: PlayerAction[]; // redux actions
    nextResolvers?: Resolver[];
    clear?: boolean;
    clearQueue?: boolean;
}
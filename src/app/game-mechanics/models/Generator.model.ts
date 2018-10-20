import { PlayerAction } from './GameAction.model';
import { Resolver } from './Resolver.model';

export const generators = {
    ROUND: 'ROUND',
    PHASE: 'PHASE',
    TURN: 'TURN',
    ACTION: 'ACTION'
}

export type GeneratorType = typeof generators.ROUND | typeof generators.PHASE |
    typeof generators.TURN | typeof generators.ACTION;

export abstract class Generator {
    abstract name: GeneratorType;
    abstract lastOperation: Resolver;
    abstract queue: Resolver[];
    abstract isFull: boolean;
    abstract isEmpty: boolean;
    abstract isActive: boolean;
    abstract items: Resolver[];

    abstract next(input?: any, state?: any): PlayerAction[];
}
import {
    Generator, GeneratorType, generators,
    Resolver, ResolverResult, GameAction
} from '../../models';

class GenericGenerator implements Generator {
    constructor(public name: GeneratorType, public items: Resolver[]) {
        this._items = [...items].reverse();
    }
    _items: Resolver[];
    lastOperation: Resolver = null;
    queue: Resolver[] = [];
    get isFull() {
        return this._items.length === this.items.length && !this.queue.length;
    };
    get isEmpty() {
        return this._items.length === 0 && this.queue.length === 0;
    }
    get isActive() {
        return !this.isFull && !this.isEmpty;
    }
    next(action?: GameAction, state?: any): GameAction[] {
        let operation: Resolver;
        if (this.queue.length > 0) {
            operation = this.queue.pop();
        } else {
            operation = this._items.pop();
        }
        const result = operation.call(action, state);
        this.queue = result.nextResolvers ? [...this.queue, ...result.nextResolvers] : this.queue;
        this.lastOperation = operation;
        return result.actions;
    };
}

export const createGenerator = (name: GeneratorType, items: Resolver[]): Generator => {
    return new GenericGenerator(name, items);
}

// items are mapped to resolvers
import { Generator, Resolver, ResolverResult, GameAction } from '../../models';

export const createGenerator = (items: Resolver[], delayedResolvers: any[]): Generator => {

    class GenericGenerator implements Generator {
        delayedResolvers = delayedResolvers;
        lastOperation = null;
        queue = null;
        items = [...items].reverse();
        get isFull() {
            return items.length === this.items.length && !this.queue;
        };
        inputIsAllowed(): boolean {
            return !!this.queue && this.delayedResolvers.findIndex(this.lastOperation) !== -1;
        };
        next(input?: any, state?: any): GameAction[] {
            let lastOperation: Resolver;
            let result: ResolverResult;
            if (input && this.inputIsAllowed()) {
                result = this.queue(input, state);
                lastOperation = this.queue;
            } else {
                const operation = this.items.pop();
                result = operation(input, state);
                lastOperation = operation;
            }
            this.queue = result.nextResolver;
            this.lastOperation = lastOperation;
            return result.actions;
        };
    }

    return new GenericGenerator();
}

// items are mapped to resolvers
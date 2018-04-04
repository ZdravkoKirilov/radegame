import { Generator, Resolver, ResolverResult, GameAction } from '../../models';

export const createGenerator = (items: Resolver[], operationsWithInput: any[]): Generator => {

    class GenericGenerator extends Generator {
        operationsWithInput = operationsWithInput;
        lastOperation = null;
        queue = null;
        items = Object.values(items).reverse();
        get isFull() {
            return items.length === this.items.length && !this.queue;
        };
        inputIsAllowed(): boolean {
            return !!this.queue && this.operationsWithInput.findIndex(this.lastOperation) !== -1;
        };
        next(input?: any, state?: any): GameAction[] {
            let lastOperation;
            let result;
            if (input && this.inputIsAllowed()) {
                result = <ResolverResult>this.queue(input, state);
                lastOperation = this.queue;
            } else {
                const operation = this.items.pop();
                result = <ResolverResult>operation(input, state);
                lastOperation = operation;
            }
            this.queue = result.callback;
            this.lastOperation = lastOperation;
            return result.actions;
        };
    }

    return new GenericGenerator();
}

// items are mapped to resolvers
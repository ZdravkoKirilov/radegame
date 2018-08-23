export class ContextManager {

    private handlers: {
        [key: string]: Set<Function>;
    } = {}

    private data: {
        [key: string]: any;
    } = {}

    set(key: string, value: any) {
        this.data[key] = value;
        const callbacks = this.handlers[key];
        if (callbacks) {
            callbacks.forEach(cb => cb(value));
        }
    }

    get(key: string) {
        return this.data[key];
    }

    subscribe = (key: string, callback: Function) => {
        const self = this;
        this.handlers[key] = this.handlers[key] || new Set();
        this.handlers[key].add(callback);
        callback(this.data[key]);

        return {
            unsubscribe() {
                self.handlers[key].delete(callback);
            }
        }
    }
}

export interface ContextSubscription {
    unsubscribe(): void;
}
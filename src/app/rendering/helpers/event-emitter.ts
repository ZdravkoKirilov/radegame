export class EventEmitter<T> {

    handlers: Set<Function> = new Set();

    subscribe(handler: Function) {
        this.handlers.add(handler);
    }

    unsubscribe(handler: Function) {
        this.handlers.delete(handler);
    }

    emit(data: T): void {
        this.handlers.forEach(handler => handler(data));
    }
}
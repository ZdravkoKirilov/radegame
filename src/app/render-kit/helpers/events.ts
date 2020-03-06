import { GenericEvent, GenericEventHandler } from "../interfaces";
import { Component } from "../models";
import { withErrorPropagation } from "./error";

export const propagateEvent = (event: GenericEvent, handlerName: string) => {
    if (!event.propagationStopped) {
        let parent: Component = event.currentTarget.parent;

        do {
            const handler: GenericEventHandler = parent[handlerName];
            if (handler) {
                withErrorPropagation(parent, () => handler(event));
            }
            parent = parent.parent;
        } while (parent && !event.propagationStopped);
    }
};
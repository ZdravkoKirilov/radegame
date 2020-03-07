import { GenericEvent, GenericEventHandler } from "../interfaces";
import { Component } from "../models";
import { withErrorPropagation } from "./error";

export const propagateEvent = (event: GenericEvent, handlerName: RzEventTypes) => {
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

export enum RzEventTypes {
    onClick = 'onClick',

    onPointerDown = 'onPointerDown',
    onPointerUp = 'onPointerUp',
    onPointerOver = 'onPointerOver',
    onPointerOut = 'onPointerOut',

    onDragEnd = 'onDragEnd',
    onDragMove = 'onDragMove',
    onScroll = 'onScroll',
    onScrollEnd = 'onScrollEnd',

    onWheel = 'onWheel',
    onKeypress = 'onKeypress',
    onFocus = 'onFocus',
    onBlur = 'onBlur',
};

export const isGenericEventType = (name: string): name is RzEventTypes => {
    return name in RzEventTypes;
};
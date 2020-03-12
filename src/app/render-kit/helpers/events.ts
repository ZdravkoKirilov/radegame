import { GenericEvent, GenericEventHandler } from "../interfaces";
import { Component } from "../models";
import { callWithErrorPropagation } from "./error";

export const propagateEvent = (event: GenericEvent, handlerName: RzEventTypes) => {
    if (!event.propagationStopped) {
        let parent: Component = event.currentTarget.parent;

        do {
            const handler: GenericEventHandler = parent.props[handlerName];
            if (handler) {
                callWithErrorPropagation(parent, () => handler(event));
            }
            parent = parent.parent;
        } while (parent && !event.propagationStopped);
    }
};

export enum RzEventTypes {
    onClick = 'onClick',

    onPointerDown = 'onPointerDown',
    onPointerUp = 'onPointerUp',
    onPointerUpOutside = 'onPointerUpOutside',
    onPointerOver = 'onPointerOver',
    onPointerOut = 'onPointerOut',
    onPointerMove = 'onPointerMove',

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
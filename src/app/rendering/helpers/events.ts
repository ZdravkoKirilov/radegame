import { DisplayObject, interaction } from "pixi.js";

import { BaseProps } from "../models";
import { Component } from "../interfaces";

export const assignEvents = (comp: Component, graphic: DisplayObject) => {
    Object.keys(comp.props).forEach((key: string) => {
        if (key.startsWith('on') && typeof comp.props[key] === 'function') {
            const handler = comp.props[key];
            const eventName = key.slice(2).toLowerCase();
            if (supported.has(eventName)) {
                graphic.on(eventName as interaction.InteractionEventTypes, event => {
                    handler(event, comp);
                });
            }
        }
    });
};

const supported = new Set([
    'click',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mouseupoutside',
    'pointercancel',
    'pointerdown',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointertap',
    'pointerup',
    'pointerupoutside',
    'rightclick',
    'rightdown',
    'rightup',
    'tap',
    'touchcancel',
    'touchend',
    'touchendoutside',
    'touchstart',
]);

export enum EVENTS {
    DRAG_END = 'DRAG_END',
    DRAG_MOVE = 'DRAG_MOVE'
};

export type EventType = typeof EVENTS.DRAG_END | typeof EVENTS.DRAG_MOVE;

export type EventPayload = {
    type: EventType;
    payload?: any;
};
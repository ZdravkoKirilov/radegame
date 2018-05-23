import { DisplayObject } from "pixi.js";

import { BaseProps } from "../models";
import { Component } from "../interfaces";

export const assignEvents = (data: BaseProps, graphic: any) => {
    const events = Object.keys(data).reduce((total: any, key: string) => {
        if (key.startsWith('on') && typeof data[key] === 'function') {
            const handler = data[key];
            const eventName = key.slice(2).toLowerCase();
            if (supported.has(eventName)) {
                graphic.on(eventName, event => {
                    handler(event, data);
                });
            }
        }
        return total;
    }, {});
};

export const makeDraggable = (elem: DisplayObject, obj: Component, handlers: { onDragStart: Function, onDragMove: Function, onDragEnd: Function }) => {
    elem.interactive = true;
    elem.buttonMode = true;

    elem.on('pointerdown', handlers.onDragStart(obj))
        .on('pointerup', handlers.onDragEnd(obj))
        .on('pointermove', handlers.onDragMove(obj));
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
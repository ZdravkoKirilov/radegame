import { interaction, DisplayObject } from 'pixi.js';

import { BaseProps } from '../models';
import { CompositeComponent } from '../mixins';
import { Component } from '../interfaces';
import { EVENTS } from '../helpers';

export type Draggable = CompositeComponent<any, any> & {
    dragging?: boolean;
    hasMoved?: boolean;
}

export const draggable = <T extends { new(...args: any[]): {} }>(constructor: T) => {
    const onDragStart = (obj: Draggable) => (event: interaction.InteractionEvent) => {
        event.stopPropagation();
        const target = obj.firstBasicChild;
        if (!obj.dragging) {
            obj.dragging = true;
        }
    };

    const onDragMove = (obj: Draggable) => (event: interaction.InteractionEvent) => {
        event.stopPropagation();
        const target = obj.firstBasicChild;
        if (obj.dragging) {
            const newPos = event.data.getLocalPosition(target.graphic.parent);
            const props = {
                ...obj.props, mapped: {
                    ...obj.props.mapped,
                    x: newPos.x - target.width / 2,
                    y: newPos.y - target.height / 2
                }
            };
            obj.setProps(props);
            obj.hasMoved = true;
        }
    };

    const onDragEnd = (obj: Draggable) => (event: interaction.InteractionEvent) => {
        event.stopPropagation();
        obj.firstBasicChild.setProps({
            alpha: 1
        });
        obj.dragging = false;
        obj.hasMoved = false;
        obj.change.emit({
            type: EVENTS.DRAG_END
        });
    };

    const original = constructor;

    function construct(constructor, args) {
        const decorated: any = function () {
            return constructor.apply(this, args);
        }
        decorated.prototype = constructor.prototype;
        return new decorated();
    }

    const newConstructor: any = function (...args) {
        const instance: Draggable = construct(original, args);
        const graphic = instance.firstBasicChild.graphic;

        instance.dragging = false;
        instance.hasMoved = false;

        makeDraggable(graphic, instance, { onDragStart, onDragEnd, onDragMove });

        return instance;
    }

    newConstructor.prototype = original.prototype;

    return newConstructor;
};

export type DragConfig = {
    onDragStart: Function, onDragMove: Function, onDragEnd: Function
};

export const makeDraggable = (elem: DisplayObject, obj: Component, handlers: DragConfig) => {
    elem.interactive = true;
    elem.buttonMode = true;

    elem.on('pointerdown', handlers.onDragStart(obj))
        .on('pointerup', handlers.onDragEnd(obj))
        .on('pointermove', handlers.onDragMove(obj));
};
import { interaction } from 'pixi.js';
import { BaseObject } from "../interfaces";
import { EVENT_TYPES, BaseObjectChangeEvent } from '../models';
import { makeDraggable, getFirstGraphic } from '../helpers';

export type Draggable = BaseObject & {
    dragging?: boolean;
    hasMoved?: boolean;
}

const onDragStart = (obj: Draggable) => (event: interaction.InteractionEvent) => {
    event.stopPropagation();
    if (!obj.dragging) {
        obj.setState({
            ...obj.state,
            alpha: 0.5
        });
        obj.dragging = true;
    }
};

const onDragMove = (obj: Draggable) => (event: interaction.InteractionEvent) => {
    event.stopPropagation();
    if (obj.dragging) {
        obj.__face__.alpha = 0.5;
        const newPos = event.data.getLocalPosition(obj.__face__.parent);
        obj.props = {
            ...obj.props,
            mapped: {
                ...obj.props.mapped,
                x: newPos.x - (obj.__face__ as any).width / 2,
                y: newPos.y - (obj.__face__ as any).height / 2
            }
        };
        obj.hasMoved = true;
    }
};

const onDragEnd = (obj: Draggable) => (event: interaction.InteractionEvent) => {
    event.stopPropagation();
    obj.__face__.alpha = 1;
    if (obj.dragging && obj.hasMoved) {

    }
    obj.dragging = false;
    obj.hasMoved = false;
};

export const draggable = <T extends { new(...args: any[]): {} }>(constructor: T) => {
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
        const graphic = getFirstGraphic<any>(instance);

        instance.dragging = false;
        instance.hasMoved = false;

        makeDraggable(graphic, instance, { onDragStart, onDragEnd, onDragMove });

        return instance;
    }

    newConstructor.prototype = original.prototype;

    return newConstructor;
};
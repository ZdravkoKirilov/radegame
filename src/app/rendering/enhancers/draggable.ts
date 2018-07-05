import { interaction, DisplayObject } from 'pixi.js';

import { StatefulComponent } from '../mixins';
import { EVENTS } from '../helpers';

export type Draggable = StatefulComponent<any, any> & {
    dragging?: boolean;
    hasMoved?: boolean;
    dragPoint?: any;
}

// export const draggable = <T extends { new(...args: any[]): {} }>(constructor: T) => {
//     const onDragStart = (obj: Draggable) => (event: interaction.InteractionEvent) => {
//         event.stopPropagation();
//         const target = obj.firstBasicChild;
//         this.dragPoint = event.data.getLocalPosition(target.graphic.parent);
//         this.dragPoint.x -= target.graphic.x;
//         this.dragPoint.y -= target.graphic.y;
//         obj.dragging = true;
//     };

//     const onDragMove = (obj: Draggable) => (event: interaction.InteractionEvent) => {
//         event.stopPropagation();
//         const target = obj.firstBasicChild;
//         if (obj.dragging) {
//             const newPos = event.data.getLocalPosition(target.graphic.parent);
//             const props = {
//                 mapped: {
//                     x: newPos.x - this.dragPoint.x,
//                     y: newPos.y - this.dragPoint.y
//                 }
//             };
//             target.setProps(props);
//             obj.hasMoved = true;
//         }
//     };

//     const onDragEnd = (obj: Draggable) => (event: interaction.InteractionEvent) => {
//         event.stopPropagation();
//         obj.firstBasicChild.setProps({
//             alpha: 1
//         });
//         obj.dragging = false;
//         obj.hasMoved = false;
//         obj.dragPoint = null;
//         obj.change.emit({
//             type: EVENTS.DRAG_END
//         });
//     };

//     const original = constructor;

//     function construct(constructor, args) {
//         const decorated: any = function () {
//             return constructor.apply(this, args);
//         }
//         decorated.prototype = constructor.prototype;
//         return new decorated();
//     }

//     const newConstructor: any = function (...args) {
//         const instance: Draggable = construct(original, args);

//         instance.dragging = false;
//         instance.hasMoved = false;

//         const oldDidMount = instance.didMount.bind(instance);
//         instance.didMount = () => {
//             const graphic = instance.firstBasicChild.graphic;
//             makeDraggable(graphic, instance, { onDragStart, onDragEnd, onDragMove });
//             oldDidMount();
//         };

//         return instance;
//     }

//     newConstructor.prototype = original.prototype;
//     newConstructor.composite = true;

//     return newConstructor;
// };

// export type DragConfig = {
//     onDragStart: Function, onDragMove: Function, onDragEnd: Function
// };

let counter = 1;

export const makeDraggable = (obj: any, elem: DisplayObject) => {
    if (obj.props.draggable) {

        elem.interactive = true;
        elem.buttonMode = true;

        obj.id = obj.id || counter++;

        // elem.on('pointerdown', onDragStart(obj))
        //     .on('pointerup', onDragEnd(obj))
        //     .on('pointermove', onDragMove(obj));

        elem.on('pointerdown', (event: interaction.InteractionEvent) => {
            event.stopPropagation();
            obj.dragPoint = event.data.getLocalPosition(obj.graphic.parent);
            obj.dragPoint.x -= obj.graphic.x;
            obj.dragPoint.y -= obj.graphic.y;
            obj.dragging = true;
            obj.bringToFront();
        });

        elem.on('pointerup', (event: interaction.InteractionEvent) => {
            event.stopPropagation();
            obj.setProps({
                alpha: 1
            });
            obj.dragging = false;
            obj.hasMoved = false;
            obj.dragPoint = null;
            obj.change.emit({
                type: EVENTS.DRAG_END
            });
            obj.props.onDragEnd && obj.props.onDragEnd(obj);
        });

        elem.on('pointermove', (event: interaction.InteractionEvent) => {
            event.stopPropagation();
            if (obj.dragging) {
                const newPos = event.data.getLocalPosition(obj.graphic.parent);
                const props = {
                    mapped: {
                        x: newPos.x - obj.dragPoint.x,
                        y: newPos.y - obj.dragPoint.y
                    }
                };
                obj.setProps(props);
                obj.hasMoved = true;
                obj.change.emit({ type: EVENTS.DRAG_MOVE });
                obj.props.onDragMove && obj.props.onDragMove(obj);
            }
        });

    }
};

const onDragStart = (obj: Draggable) => (event: interaction.InteractionEvent) => {
    event.stopPropagation();
    obj.dragPoint = event.data.getLocalPosition(obj.graphic.parent);
    obj.dragPoint.x -= obj.graphic.x;
    obj.dragPoint.y -= obj.graphic.y;
    obj.dragging = true;
    console.log(obj);
};

const onDragMove = (obj: Draggable) => (event: interaction.InteractionEvent) => {
    event.stopPropagation();
    if (obj.dragging) {
        const newPos = event.data.getLocalPosition(obj.graphic.parent);
        const props = {
            mapped: {
                x: newPos.x - obj.dragPoint.x,
                y: newPos.y - obj.dragPoint.y
            }
        };
        obj.setProps(props);
        obj.hasMoved = true;
        obj.change.emit({ type: EVENTS.DRAG_MOVE });
        obj.props.onDragMove && obj.props.onDragMove(obj);
    }
};

const onDragEnd = (obj: Draggable) => (event: interaction.InteractionEvent) => {
    event.stopPropagation();
    obj.setProps({
        alpha: 1
    });
    obj.dragging = false;
    obj.hasMoved = false;
    obj.dragPoint = null;
    obj.change.emit({
        type: EVENTS.DRAG_END
    });
    obj.props.onDragEnd && obj.props.onDragEnd(obj);
};
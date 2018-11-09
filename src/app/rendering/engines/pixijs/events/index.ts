import { AbstractEvent, Component } from "@app/rendering";
import { DisplayObject, interaction } from "pixi.js-legacy";

export class PixiEventsManager implements AbstractEvent {
    supported = new Set([
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

    assignEvents(comp: Component) {
        Object.keys(comp.props).forEach((key: string) => {
            if (key.startsWith('on') && typeof comp.props[key] === 'function') {
                const handler = comp.props[key];
                const eventName = key.slice(2).toLowerCase();
                const graphic = comp.graphic as DisplayObject;

                if (this.supported.has(eventName) && graphic) {
                    graphic.on(eventName as interaction.InteractionEventTypes, event => {
                        handler(event, comp);
                    });
                }
            }
        });
    }
}
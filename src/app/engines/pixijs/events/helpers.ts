import { RzEventTypes } from "@app/render-kit";

export enum PixiSupportedEvents {
    click = 'click',
    mousedown = 'mousedown',
    mousemove = 'mousemove',
    mouseout = 'mouseout',
    mouseover = 'mouseover',
    mouseup = 'mouseup',
    mouseupoutside = 'mouseupoutside',
    pointercancel = 'pointercancel',
    pointerdown = 'pointerdown',
    pointermove = 'pointermove',
    pointerout = 'pointerout',
    pointerover = 'pointerover',
    pointertap = 'pointertap',
    pointerup = 'pointerup',
    pointerupoutside = 'pointerupoutside',
    rightclick = 'rightclick',
    rightdown = 'rightdown',
    rightup = 'rightup',
    tap = 'tap',
    touchcancel = 'touchcancel',
    touchend = 'touchend',
    touchendoutside = 'touchendoutside',
    touchstart = 'touchstart',
};

export const pixiEventMapping = {
    [RzEventTypes.onClick]: PixiSupportedEvents.click,

    [RzEventTypes.onPointerDown]: PixiSupportedEvents.pointerdown,
    [RzEventTypes.onPointerOut]: PixiSupportedEvents.pointerout,
    [RzEventTypes.onPointerOver]: PixiSupportedEvents.pointerover,
    [RzEventTypes.onPointerUp]: PixiSupportedEvents.pointerup,
} as const;

export const toPixiEvent = (eventName: RzEventTypes): PixiSupportedEvents => pixiEventMapping[eventName];

export const toGenericEvent = (eventName: PixiSupportedEvents): RzEventTypes => {
    let result: RzEventTypes;

    for (let key in pixiEventMapping) {
        const value: PixiSupportedEvents = pixiEventMapping[key];
        if (value === eventName) {
            result = key as RzEventTypes;
            break;
        }
    }
    return result;
};
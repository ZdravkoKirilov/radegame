import { interaction } from "pixi.js";
import get from 'lodash/get';

import { RzEventTypes, BasicComponent, EventOptionalProps, GenericEvent } from "@app/render-kit";

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
  [RzEventTypes.onPointerUpOutside]: PixiSupportedEvents.pointerupoutside,
  [RzEventTypes.onPointerMove]: PixiSupportedEvents.pointermove,
} as const;

export const toPixiEvent = (eventName: RzEventTypes): PixiSupportedEvents => get(pixiEventMapping, eventName);

export const toGenericEvent = (eventName: PixiSupportedEvents): RzEventTypes => {
  let result: RzEventTypes | any = '';;

  for (let key in pixiEventMapping) {
    const value: PixiSupportedEvents = get(pixiEventMapping, key);
    if (value === eventName) {
      result = key as RzEventTypes;
      break;
    }
  }
  return result as any;
};

export const createGenericEventFromPixiEvent = (
  event: interaction.InteractionEvent,
  genericEventName: RzEventTypes,
  currentTarget: BasicComponent,
  other?: Partial<EventOptionalProps>
): GenericEvent => {

  const genericEvent: GenericEvent = {
    type: genericEventName,
    originalTarget: get(event, ['target, component']),
    currentTarget,
    stopPropagation() {
      event && event.stopPropagation();
      genericEvent.propagationStopped = true;
    },
    propagationStopped: false,
    ...(other || {}),
  };
  return genericEvent;
}

export const createGenericEventFromDOMEvent = (
  event: Event,
  genericEventName: RzEventTypes,
  currentTarget: BasicComponent,
  other?: Partial<EventOptionalProps>
): GenericEvent => {

  const genericEvent: GenericEvent = {
    type: genericEventName,
    originalTarget: currentTarget,
    currentTarget,
    stopPropagation() {
      event && event.stopPropagation();
      genericEvent.propagationStopped = true;
    },
    propagationStopped: false,
    ...(other || {}),
  };
  return genericEvent;
}
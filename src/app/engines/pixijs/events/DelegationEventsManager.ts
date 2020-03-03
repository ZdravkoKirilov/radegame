import { DisplayObject, interaction } from "pixi.js";
import { AbstractEventManager, BasicComponent, Component } from "@app/render-kit";

type TrackData = { handler: Function, graphic: DisplayObject };

export const PixiSupportedEvents = {
    click: 'click',
    mousedown: 'mousedown',
    mousemove: 'mousemove',
    mouseout: 'mouseout',
    mouseover: 'mouseover',
    mouseup: 'mouseup',
    mouseupoutside: 'mouseupoutside',
    pointercancel: 'pointercancel',
    pointerdown: 'pointerdown',
    pointermove: 'pointermove',
    pointerout: 'pointerout',
    pointerover: 'pointerover',
    pointertap: 'pointertap',
    pointerup: 'pointerup',
    pointerupoutside: 'pointerupoutside',
    rightclick: 'rightclick',
    rightdown: 'rightdown',
    rightup: 'rightup',
    tap: 'tap',
    touchcancel: 'touchcancel',
    touchend: 'touchend',
    touchendoutside: 'touchendoutside',
    touchstart: 'touchstart',

    // non pixi native events
    wheel: 'wheel',
    keypress: 'keypress',
    focus: 'focus',
} as const;

type PixiEventType = keyof typeof PixiSupportedEvents;
type ComponentEvents = Map<Component, Function>;

export class PixiDelegationEventsManager implements AbstractEventManager {

    constructor(private interactionManager: interaction.InteractionManager) {
        window.addEventListener("wheel", this.onMouseWheel, { passive: true });
        window.addEventListener("keypress", this.onKeypress);
        this.interactionManager.on('pointerdown', this.onGraphicClick);
    }

    registeredEvents: Map<PixiEventType, ComponentEvents> = new Map();

    getEventBranchForType = (type: PixiEventType) => {
        const branch = this.registeredEvents.get(type) || new Map<Component, Function>();
        return branch;
    }

    createEventTracking = (eventType: PixiEventType, branch: ComponentEvents) => {
        if (branch.size < 2) {
            this.interactionManager.on(eventType, (event: interaction.InteractionEvent) => {
                const currentBranch: ComponentEvents = this.registeredEvents[eventType];
                currentBranch.forEach((handler, component) => {
                    handler();
                    // propagation here
                    // synthetic event creation
                    // + exception for wheel, keypress, focus
                });
            });
        }
    }

    onMouseWheel = (event: MouseWheelEvent) => {
        event.stopPropagation();
        const delta = Math.sign(event.deltaY);
        if (this.elementWithWheel) {
            this.elementWithWheel.handler(delta);
        }
    }

    onKeypress = (event: KeyboardEvent) => {
        if (this.elementWithKeyboard) {
            event.stopPropagation();
            event.preventDefault();
            this.elementWithKeyboard.handler(event);
        }
    }

    elementWithWheel: TrackData;
    elementWithKeyboard: TrackData;
    focused: BasicComponent;

    assignEvents(comp: BasicComponent) {
        const graphic = comp.graphic as DisplayObject;

        Object.keys(comp.props).forEach((key: string) => {
            if (key.startsWith('on') && typeof comp.props[key] === 'function') {
                const handler: Function = comp.props[key];
                const eventName = key.slice(2).toLowerCase() as PixiEventType;
                const branch = this.getEventBranchForType(eventName);

                const genericHandler = (event: interaction.InteractionEvent) => {
                    handler(event, comp);
                };
                const wheelHandler = (event: interaction.InteractionEvent) => {
                    event.stopPropagation();
                    const data = { handler, graphic };
                    this.elementWithWheel = data;
                };
                const keypressHandler = (event: interaction.InteractionEvent) => {
                    event.stopPropagation();
                    const data = { handler, graphic };
                    this.elementWithKeyboard = data;
                };
                const focusHandler = (event: interaction.InteractionEvent) => {
                    event.stopPropagation();
                    if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
                        this.focused.props.onBlur();
                    }
                    if (this.focused !== comp) {
                        this.focused = comp;
                        comp.props.onFocus();
                    }
                };

                if (eventName in PixiSupportedEvents && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, genericHandler);
                }

                if (eventName === 'wheel' && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, wheelHandler);
                }

                if (eventName === 'keypress' && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, keypressHandler);
                }

                if (eventName === 'focus' && graphic) {
                    graphic.interactive = true;
                    branch.set(comp, focusHandler);
                }

                this.createEventTracking(eventName, branch);
            }
        });
    }

    onGraphicClick = (event: interaction.InteractionEvent) => {
        const target = event.currentTarget as DisplayObject & { component: BasicComponent };
        const comp = target ? target.component : null;
        const withWheel = this.elementWithWheel ? this.elementWithWheel.graphic : null;
        const withKeyboard = this.elementWithKeyboard ? this.elementWithKeyboard.graphic : null;

        if (target !== withWheel) {
            this.elementWithWheel = null;
        }
        if (target !== withKeyboard) {
            this.elementWithKeyboard = null;
        }

        if (this.focused && this.focused !== comp && this.focused.props.onBlur) {
            this.focused.props.onBlur();
        }
    }

    removeListeners(comp: BasicComponent) {
        this.registeredEvents.forEach(eventCategory => {
            eventCategory.delete(comp);
        });
    }

    onDestroy() {
        window.removeEventListener('wheel', this.onMouseWheel);
        window.removeEventListener('keypress', this.onKeypress);
        this.interactionManager.removeAllListeners();
    }
}
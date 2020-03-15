import { DisplayObject, interaction } from "pixi.js";
import {
    AbstractEventManager, BasicComponent, propagateEvent,
    GenericEventHandler,
    callWithErrorPropagation,
    isGenericEventType,
    RzEventTypes,
    isDescendantOf
} from "@app/render-kit";
import { PixiSupportedEvents, toPixiEvent, toGenericEvent, createGenericEventFromPixiEvent } from "./helpers";

export class PixiDelegationEventsManager implements AbstractEventManager {

    focusedComponent: BasicComponent;

    registeredEvents: {
        [key in RzEventTypes]: Map<BasicComponent, GenericEventHandler>
    } = {} as any;

    constructor(private interactionManager: interaction.InteractionManager) {
        window.addEventListener("wheel", this.onMouseWheel, { passive: true });
        window.addEventListener("keypress", this.onKeypress);
        this.interactionManager.on('pointerdown', this.onGraphicClick);
    }

    assignEvents(comp: BasicComponent) {
        const graphic = comp.graphic as DisplayObject;
        this.removeListeners(comp);
        if (graphic) {
            graphic.interactive = false;
        }

        Object.keys(comp.props).forEach((genericEventType) => {
            if (graphic && isGenericEventType(genericEventType)) {
                graphic.interactive = true;
                const handler: GenericEventHandler = comp.props[genericEventType];
                const pixiEventName = toPixiEvent(genericEventType);
                if (pixiEventName) {
                    const branch = this.createEventBranchForType(genericEventType);
                    branch.set(comp, handler);
                    this.createEventTracking(pixiEventName, graphic, handler);
                }
            }
        });
    }

    createEventTracking = (pixiEventType: PixiSupportedEvents, graphic: DisplayObject, handler: GenericEventHandler) => {
        this.interactionManager.off(pixiEventType);
        if (pixiEventType === 'pointerover' || pixiEventType === 'pointerout') { // doesnt fire on interactionManager for some reason
            graphic.off(pixiEventType);
            graphic.on(pixiEventType, event => {
                const component = graphic['component'] as BasicComponent;
                const position = event.data.getLocalPosition(component.graphic.parent);
                const genericEventType = toGenericEvent(pixiEventType);
                const genericEvent = createGenericEventFromPixiEvent(
                    event, genericEventType, component, { position }
                );
                callWithErrorPropagation(component, () => handler(genericEvent));
                propagateEvent(genericEvent, genericEventType);
            });
        } else {
            this.interactionManager.on(pixiEventType, (event: interaction.InteractionEvent) => {
                const genericEventType = toGenericEvent(pixiEventType);
                const currentBranch = this.registeredEvents[genericEventType];
                currentBranch.forEach((handler, component) => {
                    const targetComponent: BasicComponent = event.target ? event.target['component'] : null;
                    if (targetComponent === component || isDescendantOf(targetComponent, component)) {
                        const position = event.data.getLocalPosition(component.graphic.parent);
                        const genericEvent = createGenericEventFromPixiEvent(
                            event, genericEventType, component, { position }
                        );
                        callWithErrorPropagation(component, () => handler(genericEvent));
                        propagateEvent(genericEvent, genericEventType);
                    }
                });
            });
        }
    }

    onGraphicClick = (event: interaction.InteractionEvent) => {
        if (event.currentTarget) {
            const targetComponent = event.currentTarget['component'] as BasicComponent;
            const focused = this.focusedComponent;

            if (targetComponent !== focused && !isDescendantOf(targetComponent, focused)) {
                if (focused && focused.props.onBlur) {
                    const genericEvent = createGenericEventFromPixiEvent(
                        event, RzEventTypes.onBlur, focused
                    );
                    callWithErrorPropagation(focused, () => focused.props.onBlur(genericEvent));
                    propagateEvent(genericEvent, RzEventTypes.onBlur);
                }
            }
            if (targetComponent.props.onFocus) {
                const genericEvent = createGenericEventFromPixiEvent(
                    event, RzEventTypes.onFocus, focused
                );
                callWithErrorPropagation(targetComponent, () => targetComponent.props.onFocus(genericEvent));
                propagateEvent(genericEvent, RzEventTypes.onFocus);
            }

            this.focusedComponent = targetComponent;
        }
    }

    onMouseWheel = (event: MouseWheelEvent) => {
        const deltaY = Math.sign(event.deltaY);
        if (this.focusedComponent && this.focusedComponent.props.onWheel) {
            const fakeNativeEvent = { target: { component: this.focusedComponent } } as any;
            const genericEvent = createGenericEventFromPixiEvent(fakeNativeEvent, RzEventTypes.onWheel, this.focusedComponent, { deltaY });
            callWithErrorPropagation(this.focusedComponent, () => this.focusedComponent.props.onWheel(genericEvent));
            propagateEvent(genericEvent, RzEventTypes.onWheel);
        }
    }

    onKeypress = (event: KeyboardEvent) => {
        if (this.focusedComponent && this.focusedComponent.props.onKeypress) {
            const { key, keyCode, ctrlKey, altKey, shiftKey } = event;
            const fakeNativeEvent = { target: { component: this.focusedComponent } } as any;
            const genericEvent = createGenericEventFromPixiEvent(fakeNativeEvent, RzEventTypes.onKeypress, this.focusedComponent,
                { key, keyCode, ctrlKey, altKey, shiftKey }
            );
            callWithErrorPropagation(this.focusedComponent, () => this.focusedComponent.props.onKeypress(genericEvent));
            propagateEvent(genericEvent, RzEventTypes.onKeypress);
        }
    }

    removeListeners(comp: BasicComponent) {

        Object.values(this.registeredEvents).forEach(eventCategory => {
            eventCategory.delete(comp);
        });
    }

    onDestroy() {
        window.removeEventListener('wheel', this.onMouseWheel);
        window.removeEventListener('keypress', this.onKeypress);
        this.interactionManager.removeAllListeners();
    }

    createEventBranchForType = (type: RzEventTypes) => {
        const branch = this.registeredEvents[type] || new Map<BasicComponent, GenericEventHandler>();
        this.registeredEvents[type] = branch;
        return branch;
    }
}
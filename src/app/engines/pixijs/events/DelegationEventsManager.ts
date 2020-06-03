import { DisplayObject, interaction } from "pixi.js";
import {
  AbstractEventManager, BasicComponent, propagateEvent,
  GenericEventHandler,
  callWithErrorPropagation,
  isGenericEventType,
  RzEventTypes,
  isDescendantOf,
  PrimitiveInput
} from "@app/render-kit";
import {
  PixiSupportedEvents, toPixiEvent, toGenericEvent, createGenericEventFromPixiEvent,
  createGenericEventFromDOMEvent
} from "./helpers";

export class PixiDelegationEventsManager implements AbstractEventManager {

  focusedComponent: BasicComponent;

  registeredEvents: {
    [key in RzEventTypes]: Map<BasicComponent, GenericEventHandler>
  } = {} as any;

  constructor(private interactionManager: interaction.InteractionManager, private document: Document) {
    this.document.addEventListener("wheel", this.onMouseWheel, { passive: true });
    this.document.addEventListener("keypress", this.onKeypress);
    this.document.addEventListener('pointerdown', this.onInputClick);
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

        /* that event only works with PrimitiveInput, its ignored otherwise */
        if (genericEventType === 'onChange' && comp instanceof PrimitiveInput) {
          return this.handleOnChangeDOM(comp, handler);
        }

        if (pixiEventName) {
          const branch = this.createEventBranchForType(genericEventType);
          branch.set(comp, handler);
          this.createEventTracking(pixiEventName, graphic, handler);
        }
      }
    });
  }

  handleOnChangeDOM = (component: PrimitiveInput, handler: GenericEventHandler) => {
    const input: HTMLInputElement | HTMLTextAreaElement = component.graphic;
    /* I don't think onChange will work for controlled components thus oninput is used*/
    input.oninput = event => {
      const genericEvent = createGenericEventFromDOMEvent(
        event, RzEventTypes.onChange, component, { value: event.target['value'] }
      );
      callWithErrorPropagation(component, () => handler(genericEvent));
      propagateEvent(genericEvent, RzEventTypes.onChange);
    };
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
      this.focusComponent(targetComponent, event);
    }
  }

  onInputClick = (event: PointerEvent) => {
    if (event.target && event.target['component'] instanceof PrimitiveInput) {
      const targetComponent = event.target['component'];
      this.focusComponent(targetComponent, event as any); // I'm dishonest
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

  focusComponent = (targetComponent: BasicComponent, event?: interaction.InteractionEvent) => {
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

  removeListeners(comp: BasicComponent) {

    Object.values(this.registeredEvents).forEach(eventCategory => {
      eventCategory.delete(comp);
    });
  }

  onDestroy() {
    this.document.removeEventListener('wheel', this.onMouseWheel);
    this.document.removeEventListener('keypress', this.onKeypress);
    this.document.removeEventListener('pointerdown', this.onInputClick);
    this.interactionManager.removeAllListeners();
  }

  createEventBranchForType = (type: RzEventTypes) => {
    const branch = this.registeredEvents[type] || new Map<BasicComponent, GenericEventHandler>();
    this.registeredEvents[type] = branch;
    return branch;
  }
}
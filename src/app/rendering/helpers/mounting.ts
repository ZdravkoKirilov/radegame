import { Component, PRIMS } from "../models";
import { AbstractContainer } from "../interfaces";
import { StatefulComponent, FunctionalComponent, BasicComponent } from "../mixins";

export const mountComponent = (component: Component, container: AbstractContainer) => {
    if (!component) {
        return;
    }

    if (component instanceof StatefulComponent) {
        mountStatefulComponent(component, container);
    }
    if (component instanceof FunctionalComponent) {
        mountFunctionalComponent(component, container);
    }
    if (component instanceof BasicComponent) {
        mountPrimitiveComponent(component, container);
    }

    component.update();
};

const mountStatefulComponent = (component: StatefulComponent<any, any>, container: AbstractContainer) => {
    component.container = container;

    if ('willMount' in component) {
        (component as any).willMount();
    }

    component.children.forEach(child => mountComponent(child, container));

    if ('didMount' in component) {
        (component as any).didMount();
    }
};

const mountFunctionalComponent = (component: FunctionalComponent<any>, container: AbstractContainer) => {
    component.container = container;
    component.children.forEach(child => mountComponent(child, container));
};

const mountPrimitiveComponent = (component: BasicComponent, container: AbstractContainer) => {
    switch (component.type) {
        case PRIMS.container:
        case PRIMS.collection:
            component.container = container;
            container.addChild(component.graphic);
            component.children.forEach(child => mountComponent(child, component.graphic));
            break;
        case PRIMS.rectangle:
        case PRIMS.circle:
            component.container = container;
            container.addChild(component.graphic);
            component.children.forEach(child => mountComponent(child, container));
            break;
        case PRIMS.sprite:
        case PRIMS.text:
        case PRIMS.line:
        case PRIMS.polygon:
            component.container = container;
            container.addChild(component.graphic);
            break;
        case PRIMS.fragment:
            component.container = container;
            component.children.forEach(child => mountComponent(child, container));
        default:
            break;
    }
};
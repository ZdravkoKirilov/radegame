import { CompositeComponent, Component } from "../models";
import { AbstractContainer } from "../interfaces";
import { StatefulComponent, BasicComponent } from "../bases";
import { PRIMS } from "../primitives";
import { RenderFunction } from "../models/Component";
import { isStateful, isPrimitive, isFunctional } from "./misc";

export const unmountComponent = (component: Component) => {
    console.debug('unmount component: ', component);
    if (isStateful(component)) {
        unmountStatefulComponent(component);
    }
    if (isPrimitive(component)) {
        unmountPrimitiveComponent(component);
    }
    if (isFunctional(component)) {
        unmountFunctionalComponent(component);
    }
};

export const unmountStatefulComponent = (component: StatefulComponent) => {
    unmountComposite(component);
};

export const unmountFunctionalComponent = (component: RenderFunction) => {
    unmountComposite(component);
};

export const unmountPrimitiveComponent = (component: BasicComponent) => {
    component.remove();
};

export const mountComponent = (component: Component, container: AbstractContainer): Component => {
    if (!component) {
        return;
    }
    if (isStateful(component)) {
        (component as any).__mounted__ = true;
        return mountStatefulComponent(component, container);
    }
    if (isPrimitive(component)) {
        (component as any).__mounted__ = true;
        return mountPrimitiveComponent(component, container);
    }
    (component as any).__mounted__ = true;
    return mountFunctionalComponent(component, container);
};

const mountStatefulComponent = (component: StatefulComponent, container: AbstractContainer) => {
    component.container = container;

    if ('willMount' in component) {
        component.willMount.call(component);
    }
    component.children = component.children.map(child => mountComponent(child, container));

    if ('didMount' in component) {
        component.didMount.call(component);
    }

    component.animations.forEach(animation => {
        // const enterAnimations: AnimationGroup[] = [];
        // enterAnimations.forEach(animation => {
        //     animation.playAll();
        // });
    });

    return component;
};

const mountFunctionalComponent = (component: RenderFunction, container: AbstractContainer) => {
    component.container = container;
    component.children = component.children.map(child => mountComponent(child, container));
    return component;
};

const mountPrimitiveComponent = (component: BasicComponent, container: AbstractContainer) => {
    component.container = container;
    switch (component.type) {
        case PRIMS.container:
        case PRIMS.collection:
            container.addChild(component.graphic);
            component.children = component.children.map(child => mountComponent(child, component.graphic));
            break;
        case PRIMS.rectangle:
        case PRIMS.circle:
        case PRIMS.ellipse:
        case PRIMS.polygon:
        case PRIMS.sprite:
            container.addChild(component.graphic);
            component.children = component.children.map(child => mountComponent(child, container));
            break;
        case PRIMS.text:
        case PRIMS.line:
            container.addChild(component.graphic);
            break;
        case PRIMS.fragment:
            component.children = component.children.map(child => mountComponent(child, container));
            break;
        default:
            break;
    }

    return component;
};

export const unmountComposite = async (component: CompositeComponent) => {
    if (component instanceof StatefulComponent) {
        // const leaveAnimations: AnimationGroup[] = [];
        // await Promise.all(leaveAnimations.map(animation => animation.playAll()));
    }

    if ('willUnmount' in component) {
        component.willUnmount();
    }

    (component.children as any).forEach(child => {
        if (child) {
            unmountComponent(child);
        }
    });
};
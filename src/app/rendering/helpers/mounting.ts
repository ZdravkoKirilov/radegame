import { Component, PRIMS, CompositeComponent, Lifecycles } from "../models";
import { AbstractContainer } from "../interfaces";
import { StatefulComponent, FunctionalComponent, BasicComponent } from "../mixins";
import { AnimationGroup } from "../animations";

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
        (component as any).willMount.call(component);
    }

    component.children.forEach(child => mountComponent(child, container));

    if ('didMount' in component) {
        (component as any).didMount.call(component);
    }

    component.animations.forEach(animation => {
        // const enterAnimations: AnimationGroup[] = [];
        // enterAnimations.forEach(animation => {
        //     animation.playAll();
        // });
    });
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
        case PRIMS.ellipse:
        case PRIMS.polygon:
        case PRIMS.sprite:
            component.container = container;
            container.addChild(component.graphic);
            component.children.forEach(child => mountComponent(child, container));
            break;
        case PRIMS.text:
        case PRIMS.line:
            component.container = container;
            container.addChild(component.graphic);
            break;
        case PRIMS.fragment:
            component.container = container;
            component.children.forEach(child => mountComponent(child, container));
        case PRIMS.shadow:
            component.container = container;
        default:
            break;
    }
};

export const unmountComposite = async (component: CompositeComponent) => {
    console.warn('unmount composite: ');
    console.dir(component);

    if (component instanceof StatefulComponent) {
        // const leaveAnimations: AnimationGroup[] = [];
        // await Promise.all(leaveAnimations.map(animation => animation.playAll()));
    }

    if ('willUnmount' in component) {
        (component as Lifecycles).willUnmount();
    }

    component.children.forEach(child => {
        if (child) {
            child.remove();
        }
    });
};
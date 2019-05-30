import { CompositeComponent, Component } from "../models";
import { AbstractContainer } from "../interfaces";
import { StatefulComponent, BasicComponent } from "../bases";
import { PRIMS } from "../primitives";
import { RenderFunction } from "../models/Component";

export const mountComponent = (component: Component, container: AbstractContainer): Component => {
    if (!component) {
        return;
    }
    if (component instanceof StatefulComponent) {
        return mountStatefulComponent(component, container);
    }
    if (component instanceof BasicComponent) {
        return mountPrimitiveComponent(component, container);
    }
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
    console.warn('unmount composite: ');
    console.dir(component);

    if (component instanceof StatefulComponent) {
        // const leaveAnimations: AnimationGroup[] = [];
        // await Promise.all(leaveAnimations.map(animation => animation.playAll()));
    }

    if ('willUnmount' in component) {
        component.willUnmount();
    }

    // component.children.forEach(child => {
    //     if (child) {
    //         child.remove();
    //     }
    // });
};
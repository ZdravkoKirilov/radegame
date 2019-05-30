import { CompositeComponent, Component } from "../models";
import { AbstractContainer } from "../interfaces";
import { StatefulComponent, BasicComponent } from "../bases";
import { PRIMS } from "../primitives";

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

const mountStatefulComponent = (component: Component, container: AbstractContainer) => {
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

const mountFunctionalComponent = (node: TrackNode, container: AbstractContainer) => {
    node.container = container;
    node.children = node.children.map(child => mountComponent(child, container));
    return node;
};

const mountPrimitiveComponent = (node: TrackNode, container: AbstractContainer) => {
    const component = node.component as BasicComponent;
    node.container = container;
    switch (component.type) {
        case PRIMS.container:
        case PRIMS.collection:
            container.addChild(component.graphic);
            node.children = node.children.map(child => mountComponent(child, component.graphic));
            break;
        case PRIMS.rectangle:
        case PRIMS.circle:
        case PRIMS.ellipse:
        case PRIMS.polygon:
        case PRIMS.sprite:
            container.addChild(component.graphic);
            node.children = node.children.map(child => mountComponent(child, container));
            break;
        case PRIMS.text:
        case PRIMS.line:
            container.addChild(component.graphic);
            break;
        case PRIMS.fragment:
            node.children = node.children.map(child => mountComponent(child, container));
            break;
        default:
            break;
    }

    return node;
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
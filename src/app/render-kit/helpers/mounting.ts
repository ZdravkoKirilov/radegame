import {
    CompositeComponent, Component, AbstractContainer, StatefulComponent, BasicComponent, PRIMS, RenderFunction,
    isStateful, isPrimitive, isFunctional, cleanAllHooks, callWithErrorPropagation
} from "../internal";

export const unmountComponent = (component: Component) => {
    if (component && (component as any).__mounted__ === true) {
        console.debug('unmount component: ', component);
        if (isStateful(component)) {
            unmountStatefulComponent(component);
            (component as any).__mounted__ = false;
        }
        if (isPrimitive(component)) {
            unmountPrimitiveComponent(component);
            (component as any).__mounted__ = false;
        }
        if (isFunctional(component)) {
            unmountFunctionalComponent(component);
            (component as any).__mounted__ = false;
        }
    }
};

export const unmountStatefulComponent = (component: StatefulComponent) => {

    if ('willUnmount' in component) {
        component.willUnmount();
    }

    unmountChildren(component);
};

export const unmountFunctionalComponent = (component: RenderFunction) => {
    cleanAllHooks(component, component.meta);
    unmountChildren(component);
};

export const unmountPrimitiveComponent = (component: BasicComponent) => {
    component.remove();
};

export const mountComponent = (component: Component, container: AbstractContainer): Component => {
    if (!component) {
        return;
    }
    console.log('Mounting: ', component);
    if (isStateful(component)) {
        (component as any).__mounted__ = true;
        return mountStatefulComponent(component, container);
    }
    if (isPrimitive(component)) {
        (component as any).__mounted__ = true;
        return mountPrimitiveComponent(component, container);
    }
    if (isFunctional(component)) {
        (component as any).__mounted__ = true;
        return mountFunctionalComponent(component, container);
    }
};

const mountStatefulComponent = (component: StatefulComponent, container: AbstractContainer) => {
    component.container = container;

    if ('willMount' in component) {
        callWithErrorPropagation(component.parent, () => component.willMount.call(component));
    }

    component.children = component.children.map(child => mountComponent(child, container));

    if ('didMount' in component) {
        callWithErrorPropagation(component.parent, () => component.didMount.call(component));
    }

    return component;
};

const mountFunctionalComponent = (component: RenderFunction, container: AbstractContainer) => {
    component.container = container;
    component.children = component.children.map(child => mountComponent(child, container));
    return component;
};

const mountPrimitiveComponent = (component: BasicComponent, container: AbstractContainer) => {
    component.container = component.container || container; // PrimitiveInput will have predefined container
    switch (component.type) {
        case PRIMS.container:
        case PRIMS.collection:
            container.addChild(component.graphic);
            component.children = component.children.map(child => mountComponent(child, component.graphic));
            component.update();
            break;
        case PRIMS.rectangle:
        case PRIMS.circle:
        case PRIMS.ellipse:
        case PRIMS.polygon:
        case PRIMS.sprite:
            container.addChild(component.graphic);
            component.children = component.children.map(child => mountComponent(child, container));
            component.update();
            break;
        case PRIMS.text:
        case PRIMS.line:
        case PRIMS.input:
            container.addChild(component.graphic);
            component.update();
            break;
        case PRIMS.fragment:
            component.children = component.children.map(child => mountComponent(child, container));
            component.update();
            break;
        case PRIMS.input:
            component.container.addChild(component.graphic);
            component.graphic.parentContainer = container;
            component.update();
        default:
            break;
    }

    return component;
};

export const unmountChildren = async (component: CompositeComponent) => {
    (component.children as any).forEach(child => {
        if (child) {
            unmountComponent(child);
        }
    });
};
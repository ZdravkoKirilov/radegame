import { RzElement, MetaProps, Component, RenderFunction } from "../models";
import { AbstractFactory } from "../interfaces";
import { BasicComponent, StatefulComponent } from "../bases";
import { hasPrimitiveType, getRealType } from './misc';

export const createComponent = (
    element: RzElement,
    factory: AbstractFactory,
    meta: MetaProps,
): Component => {
    if (!element) {
        return null;
    }

    let component: Component;

    if (typeof element.type === 'string') {
        let { type } = element;

        if (hasPrimitiveType(element.type)) {
            component = createPrimitiveComponent(element, factory, meta);
            registerAnimations(component);
            component.type = element.type;
            const children = element.children.map(child => createComponent(child, factory, meta));
            if (component.graphic) {
                component.graphic.component = component;
            }
            component.children = children;
            return component;
        } else {
            let realType = getRealType(factory, type);

            if (realType) {
                return createComponent({ ...element, type: realType as any }, factory, meta);
            }
        }

    }

    if ((element.type as any).stateful) {
        component = createStatefulComponent(element, meta);
        component.type = element.type;
        const children = [createComponent(component.render(), factory, meta)];
        component.children = children;
        return component;
    }

    if (typeof element.type === typeof Function) {
        component = element.type as RenderFunction;
        const children = [createComponent(component(element.props), factory, meta)];
        component.props = element.props;
        component.children = children;
        component.type = component;
        return component;
    }

    if (!component && element.type) {
        console.warn('Unrecognized component: ', element);
    }

    return null;
};

const createPrimitiveComponent = (element: RzElement, factory: AbstractFactory, meta: MetaProps): BasicComponent => {
    return factory.createComponent(element, meta);
};

const createStatefulComponent = (element: RzElement, meta: MetaProps): StatefulComponent => {
    const constructor = element.type as any;
    const component = new constructor(element.props, meta);
    return component;
};

const registerAnimations = (component: BasicComponent) => {
    // if (component.props.animations) {
    //     component.props.animations.forEach(animation => animation.addComponent(component));
    // }
};
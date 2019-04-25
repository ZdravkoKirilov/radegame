import { values } from 'lodash';
import { RzElement, MetaProps, Component, PRIMS, RenderFunction, PrimitiveType } from "../models";
import { AbstractFactory } from "../interfaces";
import { BasicComponent, StatefulComponent, FunctionalComponent } from "../mixins";

export const createComponent = (element: RzElement | RzElement[], factory: AbstractFactory, meta?: MetaProps, parent?: Component): Component | null => {
    let component: Component = null;

    if (Array.isArray(element)) {
        element = element[0]; // only 1 direct child
    }

    if (!element) {
        return null;
    }

    if (!element.props) {
        debugger;
    }

    element.props.children = element.children; // ?

    if (typeof element.type === 'string') {
        let { type } = element;

        if (new Set(values(PRIMS)).has(element.type)) {
            component = createPrimitiveComponent(element, factory, meta);

            registerAnimations(component);
            component.type = element.type;
            component.parent = parent;
            component.children = createPrimitiveChildren(element, factory, meta, component);
            createRefs(component);
            if (component.graphic) {
                component.graphic.component = component;
            }
            return component;
        } else {
            let realType = factory.customResolvers.reduce((accumulator, resolver) => {
                if (type in resolver) {
                    return resolver[type] as any;
                }
            }, null);

            if (realType) {
                component = createComponent(element, factory, meta, parent);
                return component;
            }
        }

    }

    if ((element.type as any).stateful) {
        component = createStatefulComponent(element, meta) as StatefulComponent<typeof element.props, any>;
        component.type = element.type;
        component.parent = parent;
        component.children = [createComponent(component.render(), factory, meta, component)];
        return component;
    }
    if (typeof element.type === typeof Function) {
        component = createFunctionalComponent(element, meta) as FunctionalComponent<typeof element.props>;
        component.type = element.type;
        component.parent = parent;
        component.children = [createComponent(component.render(), factory, meta, component)];
        return component;
    }

    if (!component && component.type) {
        console.warn('Unrecognized component: ', element);
    }

    return component;
};

const createPrimitiveComponent = (element: RzElement, factory: AbstractFactory, meta: MetaProps): BasicComponent => {
    switch (element.type) {
        case PRIMS.container:
            return factory.createContainer(element, meta);
        case PRIMS.collection:
            return factory.createCollection(element, meta);
        case PRIMS.sprite:
            return factory.createSprite(element, meta);
        case PRIMS.text:
            return factory.createText(element, meta);
        case PRIMS.line:
            return factory.createLine(element, meta);
        case PRIMS.fragment:
            return factory.createFragment(element, meta);
        case PRIMS.polygon:
            return factory.createPolygon(element, meta);
        case PRIMS.rectangle:
            return factory.createRectangle(element, meta);
        case PRIMS.circle:
            return factory.createCircle(element, meta);
        case PRIMS.ellipse:
            return factory.createEllipse(element, meta);
        case PRIMS.shadow:
            return factory.createShadow(element, meta);
        default:
            return null;
    }
};

const createStatefulComponent = (element: RzElement, meta: MetaProps): StatefulComponent<typeof element.props, any> => {
    const constructor = element.type as typeof StatefulComponent;
    const props = constructor.defaultProps ? { ...constructor.defaultProps, ...element.props } : element.props;
    const component = new constructor(props, meta);
    component.meta = meta;
    return component;
};

const createFunctionalComponent = (element: RzElement, meta: MetaProps): FunctionalComponent<typeof element.props> => {
    const renderFunc = element.type as any;
    const props = renderFunc.defaultProps ? { ...renderFunc.defaultProps, ...element.props } : element.props;
    const component = new FunctionalComponent(props, renderFunc as RenderFunction<any>, meta);
    component.meta = meta;
    return component;
};

const createRefs = (component: BasicComponent) => {
    const refCallback = component.props.ref;

    if (refCallback && typeof refCallback === typeof Function) {
        refCallback(component.graphic);
    }
};

const registerAnimations = (component: BasicComponent) => {
    if (component.props.animations) {
        component.props.animations.forEach(animation => animation.addComponent(component));
    }
};

const primitivesWithRenderedChildren = new Set([PRIMS.shadow]);

const createPrimitiveChildren = (element: RzElement, factory: AbstractFactory, meta: MetaProps, component: Component) => {
    if (primitivesWithRenderedChildren.has(element.type as PrimitiveType)) {
        return [createComponent(component.render(), factory, meta, component)];
    } else {
        return element.children.map(child => createComponent(child, factory, meta, component));
    }
};
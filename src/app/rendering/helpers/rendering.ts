import { AbstractFactory, AbstractContainer, Component, AbstractRenderEngine } from "../interfaces";
import { RzElement, MetaProps, RzElementType, RzElementProps, RenderFunction } from "../models";
import { BasicComponent, StatefulComponent, FunctionalComponent } from "../mixins";
import { PRIMITIVE_TYPES } from "../config";

export const createRenderer2 = (abstractFactory: AbstractFactory) => {
    const renderer = (element: RzElement, meta: MetaProps, container: AbstractContainer): Component => {
        const component = createComponent(element, abstractFactory, meta);
        mountComponent(component, container);
        return component;
    };
    return renderer;
};

export const createRenderer = (engine: AbstractRenderEngine, resources: Array<string>) => {
    const renderFunc = (elem: RzElement, meta: MetaProps, container: AbstractContainer): Promise<Component> => {
        return new Promise((resolve) => {
            engine.loader.loadAll(resources).then(resources => {
                meta = meta || {} as MetaProps;
                meta.textures = resources;
                meta.engine = engine;
                const component = createComponent(elem, engine.factory, meta);
                mountComponent(component, container);
                resolve(component);
            });
        });
    }
    return renderFunc;
};

export const createElement = (
    type: RzElementType,
    props: RzElementProps,
    ...children: RzElement[]): RzElement | null => {
    return {
        type, props, children: children || []
    };
};

export const createComponent = (
    element: RzElement,
    factory: AbstractFactory,
    meta?: MetaProps): Component | null => {
    let component = null;
    element.props.children = element.children;

    if (!element) {
        return null;
    }

    if (typeof element.type === 'string') {
        element.props.type = element.type;
        component = createPrimitiveComponent(element, factory, meta) as BasicComponent;
        component.children = element.children.map(child => createComponent(child, factory, meta));
    }
    if (typeof element.type === typeof StatefulComponent) {
        component = createStatefulComponent(element, meta) as StatefulComponent<any, any>;
        component.children = [createComponent(component.render(), factory, meta)];
    }
    if (typeof element.type === typeof Function) {
        component = createFunctionalComponent(element, meta) as FunctionalComponent<any>;
        component.children = [createComponent(component.render(), factory, meta)];
    }

    return component;
};

const createPrimitiveComponent = (element: RzElement, factory: AbstractFactory, meta: MetaProps): BasicComponent => {
    switch (element.type) {
        case PRIMITIVE_TYPES.CONTAINER:
            return factory.createContainer(element, meta);
        case PRIMITIVE_TYPES.COLLECTION:
            return factory.createCollection(element, meta);
        case PRIMITIVE_TYPES.SPRITE:
            return factory.createSprite(element, meta);
        case PRIMITIVE_TYPES.TEXT:
            return factory.createText(element, meta);
        case PRIMITIVE_TYPES.LINE:
            return factory.createLine(element, meta);
        case PRIMITIVE_TYPES.FRAGMENT:
            return factory.createFragment(element, meta);
        default:
            return null;
    }
};

const createStatefulComponent = (element: RzElement, meta: MetaProps): StatefulComponent<typeof element.props, any> => {
    const constructor = element.type as typeof StatefulComponent;
    const component = new constructor(element.props);
    component.meta = meta;
    return component;
};

const createFunctionalComponent = (element: RzElement, meta: MetaProps): FunctionalComponent<typeof element.props> => {
    const component = new FunctionalComponent(element.props, element.type as RenderFunction<typeof element.props>);
    component.meta = meta;
    return component;
};

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
};

const mountStatefulComponent = (component: StatefulComponent<any, any>, container: AbstractContainer) => {
    if ('willMount' in component) {
        (component as any).willMount();
    }
    component.children.forEach(child => mountComponent(child, container));
    if ('didMount' in component) {
        (component as any).didMount();
    }
};

const mountFunctionalComponent = (component: FunctionalComponent<any>, container: AbstractContainer) => {
    component.children.forEach(child => mountComponent(child, container));
};

const mountPrimitiveComponent = (component: BasicComponent, container: AbstractContainer) => {
    switch (component.props.type) {
        case PRIMITIVE_TYPES.CONTAINER:
        case PRIMITIVE_TYPES.COLLECTION:
            container.addChild(component.graphic);
            component.children.forEach(child => mountComponent(child, component.graphic));
            break;
        case PRIMITIVE_TYPES.SPRITE:
        case PRIMITIVE_TYPES.TEXT:
        case PRIMITIVE_TYPES.LINE:
            container.addChild(component.graphic);
            break;
        case PRIMITIVE_TYPES.FRAGMENT:
            component.children.forEach(child => mountComponent(child, container));
        default:
            break;
    }
};
import {
    RzElement, MetaProps, Component, RenderFunction, isOfPrimitiveType, isStatefulType, isRenderFunction,
    AbstractFactory, BasicComponent, StatefulComponent, getRealType, flatRender, cloneRenderFunction,
    prepareExtras, callWithErrorPropagation
} from "../internal";

export const createComponent = (
    element: RzElement,
    factory: AbstractFactory,
    meta: MetaProps,
    parent: Component | undefined,
): Component | undefined => {
    if (!element || !element.type) {
        return undefined;
    }

    if (typeof element.type === 'string') {
        let { type } = element;

        if (isOfPrimitiveType(element.type)) {
            const component = createPrimitiveComponent(element, factory, meta);
            if (component) {
                component.parent = parent;
                component.type = element.type;
                const children = (element.children as RzElement[]).map(child => {
                    const comp = createComponent(child, factory, meta, component);
                    if (comp) {
                        comp.parent = component;
                    }
                    return comp;
                }).filter(Boolean);

                if (component.graphic) {
                    component.graphic.component = component;
                }
                component.children = children as Component[];
                return component;
            }

        } else {
            let realType = getRealType(factory, type);

            if (realType) {
                return createComponent({ ...element, type: realType }, factory, meta, parent);
            }
        }
    }

    if (isStatefulType(element.type)) {
        const component = createStatefulComponent(element, meta);
        component.type = element.type;
        component.parent = parent;
        const rendered = callWithErrorPropagation<RzElement>(parent, () => flatRender(component.render()));
        const child = createComponent(rendered, factory, meta, component);
        if (child) {
            child.parent = component;
        }
        const children = [child] as Component[];
        component.children = children;
        return component;
    }

    if (isRenderFunction(element.type)) {
        const originalType = element.type as RenderFunction;
        const renderFunc = cloneRenderFunction(originalType, meta);
        renderFunc.parent = parent;
        const extras = prepareExtras(renderFunc, meta);
        const rendered = callWithErrorPropagation(parent, () => flatRender(renderFunc(element.props, extras)));
        const child = createComponent(rendered, factory, meta, renderFunc);
        if (child) {
            child.parent = renderFunc;
        }
        const children = [child];
        renderFunc.props = element.props;
        renderFunc.children = children;
        renderFunc.type = originalType;
        return renderFunc;
    }

    throw new Error(`Unrecognized component: ${JSON.stringify(element)}`);
};

const createPrimitiveComponent = (element: RzElement, factory: AbstractFactory, meta: MetaProps): BasicComponent => {
    return factory.createComponent(element, meta);
};

const createStatefulComponent = (element: RzElement, meta: MetaProps): StatefulComponent => {
    const constructor = element.type as any;
    const component = new constructor(element.props, meta);
    return component;
};
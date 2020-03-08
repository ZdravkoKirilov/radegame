import { RzElement, MetaProps, Component, RenderFunction } from "../models";
import { AbstractFactory } from "../interfaces";
import { BasicComponent, StatefulComponent } from "../bases";
import { hasPrimitiveType, getRealType, flatRender, cloneRenderFunction } from './misc';
import { prepareExtras } from "./hooks";
import { callWithErrorPropagation } from "./error";

export const createComponent = (
    element: RzElement,
    factory: AbstractFactory,
    meta: MetaProps,
    parent: Component,
): Component => {
    if (!element) {
        return null;
    }

    if (!element.type) {
        debugger;
    }

    let component: Component;

    if (typeof element.type === 'string') {
        let { type } = element;

        if (hasPrimitiveType(element.type)) {
            component = createPrimitiveComponent(element, factory, meta);
            component.parent = parent;
            component.type = element.type;
            const children = (element.children as RzElement[]).map(child => {
                const comp = createComponent(child, factory, meta, component);
                if (comp) {
                    comp.parent = component;
                }
                return comp;
            });
            if (component.graphic) {
                component.graphic.component = component;
            }
            component.children = children;
            return component;
        } else {
            let realType = getRealType(factory, type);

            if (realType) {
                return createComponent({ ...element, type: realType as any }, factory, meta, component);
            }
        }
    }

    if ((element.type as any).stateful) {
        component = createStatefulComponent(element, meta);
        component.type = element.type;
        component.parent = parent;
        const rendered = callWithErrorPropagation(parent, () => flatRender(component['render']()));
        const child = createComponent(rendered, factory, meta, component);
        if (child) {
            child.parent = component;
        }
        const children = [child];
        component.children = children;
        return component;
    }

    if (typeof element.type === typeof Function) {
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
import { Component, CurriedMounter, Mounter, Patcher, isComposite } from "../interfaces";
import { parse } from "./parser";
import { BaseProps, MetaProps } from "../models";
import { toIndexedList, asArray } from "@app/shared";
import { Factory } from "./factory";
import { DisplayObject } from "pixi.js";

export const createPatcher = (mount: Mounter, factory: Factory, meta: MetaProps): Patcher => {
    return (elem: Component) => patch(elem, meta, mount, factory);
};

export const patch = (elem: Component, meta: MetaProps, mount: Mounter, factory) => {
    let newProps = elem.props;
    const createMounter = (container: any, parent: Component) => (props: BaseProps) => mount(props, container, parent, factory, meta);
    if (isComposite(elem)) {
        newProps = parse({
            source: elem.render(),
            context: elem,
            meta
        });
    } else {
        Object.keys(newProps.mapped || {}).forEach(key => {
            elem.graphic[key] = newProps.mapped[key];
            setProp(elem, key, newProps.mapped[key]);

        });
    }


    elem.children = patchChildren(elem, newProps, createMounter(elem.container, elem));
};

const patchChildren = (elem: Component, newProps: BaseProps, mounter: CurriedMounter): Array<Component> => {
    const newChildrenNames = new Set(newProps.children.map(props => props.name));
    const without_redundant = removeChildren(elem.children, newChildrenNames);
    const childrenList = toIndexedList(without_redundant, 'props.name');
    const with_additional = upsertChildren(childrenList as any, asArray(newProps.children), mounter);

    return with_additional;
};

const removeChildren = (children: Component[], newChildren: Set<string>): Array<Component> => {
    return children.filter(child => {
        if (newChildren.has(child.props.name)) {
            return true;
        }
        child.remove();
        return false;
    });
};

const upsertChildren = (children: { [key: string]: Component }, newChildrenProps: BaseProps[], mount: CurriedMounter): Array<Component> => {
    const result = newChildrenProps.map(props => {
        if (props.name in children) {
            const childComponent = children[props.name];
            childComponent.setProps(props);
            return childComponent;
        } else {
            const newChildComponent = mount(props);
            return newChildComponent;
        }
    });

    return result;
};

const getComputedProp = (elem: Component, prop: string, value: string): number => {
    let result;
    const relativeTo = Number(elem.props.relativeWidth);
    const isPercentage = value.endsWith('%');
    const number = Number(value.slice(0, -1));
    result = relativeTo && isPercentage ? relativeTo * (number / 100) : value;

    return result;
};
const setProp = (elem: Component, prop: string, value: string | number) => {
    let result;
    if (!value) {
        result = elem.parent.width;
    }
    if (typeof value === 'number') {
        result = value;
    }
    if (typeof value === 'string') {
        result = getComputedProp(elem, prop, value);
    }
    elem.graphic[prop] = result;
    return result;
};


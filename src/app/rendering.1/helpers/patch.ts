import { PRIMITIVE_TYPES } from '../config';
import { Component, CurriedMounter, Mounter, Patcher, isComposite } from "../interfaces";
import { parse } from "./parser";
import { BaseProps, MetaProps } from "../models";
import { toIndexedList, asArray } from "@app/shared";
import { Factory } from "./factory";
import { Graphics, Point, DisplayObject } from "pixi.js-legacy";

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
        updatePrimitive(newProps, elem.graphic);
    }

    // elem.children = patchChildren(elem, newProps, createMounter(elem.container, elem));
};

const updatePrimitive = (props: BaseProps, graphic: DisplayObject) => {
    switch (props.type) {
        case PRIMITIVE_TYPES.LINE:
            updateLine(props, graphic as Graphics);
            break;
        default:
            updateGeneric(props, graphic);

    }
}

const updateGeneric = (props: BaseProps, graphic: DisplayObject) => {
    Object.keys(props.mapped || {}).forEach(key => {
        setProp(graphic, key, props.mapped[key]);

    });
};

const updateLine = (props: BaseProps, line: Graphics) => {
    const points = [...props.points];
    const start = points.shift();
    line.clear();
    line.lineStyle(props.mapped.strokeThickness, props.mapped.strokeColor, props.mapped.alpha);

    line.moveTo(start[0], start[1]);

    points.forEach((coord) => {
        line.lineTo(coord[0], coord[1]);
    });
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

const setProp = (graphic: DisplayObject, prop: string, value: string | number) => {
    const result = value;
    graphic[prop] = result;
    return result;
};


import { DisplayObject } from "pixi.js";
import { Component, findRelativeParent, Styles, propIsRelative } from "@app/rendering";

export const bringToFront = (obj: DisplayObject) => {
    const parent = obj.parent;
    if (parent) {
        const length = parent.children.length;
        parent.setChildIndex(obj, length - 1);
    }
};

export const getValue = (value: any, prop: keyof Styles, comp: Component): any => {
    if (propIsRelative(prop)) {
        const parent = findRelativeParent(comp);
        const styles = parent ? parent.props.styles : null;
        if (styles) {
            const parentValue = getValue(styles[prop], prop, parent);
            return value + parentValue;
        }
        return value;
    }
    return value;
}

export const setProp = (comp: Component, prop: keyof Styles, value: string | number) => {
    const { graphic } = comp;
    const result = getValue(value, prop, comp);
    graphic[prop] = result;
    return result;
};
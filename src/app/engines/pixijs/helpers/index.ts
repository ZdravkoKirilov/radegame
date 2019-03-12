import { DisplayObject, Container, Sprite } from "pixi.js";
import { Component, findRelativeParent, Styles, propIsRelative } from "@app/rendering";

export const bringToFront = (obj: DisplayObject) => {
    const parent = obj.parent;
    if (parent) {
        const length = parent.children.length;
        parent.setChildIndex(obj, length - 1);
    }
};

export const getValue = (value: any, prop: keyof Styles, comp: Component): any => {
    // if (propIsRelative(prop)) {
    //     const parent = findRelativeParent(comp);
    //     const styles = parent ? parent.props.styles : null;
    //     if (styles) {
    //         const parentValue = getValue(styles[prop], prop, parent);
    //         return value + parentValue;
    //     }
    //     return value;
    // }
    return value;
}

export const setProp = (comp: Component, prop: keyof Styles, value: string | number) => {
    const graphic: DisplayObject  = comp.graphic;
    const result = getValue(value, prop, comp);

    if (prop === 'anchor') {
        return (graphic as Sprite).anchor.set(result);
    }
    
    if (prop === 'pivot') {
        return (graphic as Sprite).pivot.set(result);
    }

    if (prop === 'skew') {
        const [x, y] = result.split(' ');
        return (graphic as Sprite).skew.set(x, y);
    }

    graphic[prop] = result;
    return result;
};
import { DisplayObject, Sprite } from "pixi.js";
import { Component, Styles } from "@app/rendering";

export const bringToFront = (obj: DisplayObject) => {
    const parent = obj.parent;
    if (parent) {
        const length = parent.children.length;
        parent.setChildIndex(obj, length - 1);
    }
};

export const getValue = (value: any, prop: keyof Styles, comp: Component): any => {
    return value;
}

export const setProp = (comp: Component, prop: keyof Styles, value: string | number) => {
    const graphic: DisplayObject = comp.graphic;
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

    if (prop === 'scale') {
        return (graphic as Sprite).scale.set(result);
    }

    graphic[prop] = result;
    return result;
};
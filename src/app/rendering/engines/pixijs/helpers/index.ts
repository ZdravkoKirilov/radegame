import { DisplayObject } from "pixi.js";
import { Component } from "@app/rendering";

export const bringToFront = (obj: DisplayObject) => {
    const parent = obj.parent;
    if (parent) {
        const length = parent.children.length;
        parent.setChildIndex(obj, length -1);
    }
};

export const getValue = (value: any, prop: string, comp: Component): any => {
    return value;
}

export const setProp = (comp: Component, prop: string, value: string | number) => {
    const { graphic } = comp;
    const result = getValue(value, prop, comp);
    graphic[prop] = result;
    return result;
};
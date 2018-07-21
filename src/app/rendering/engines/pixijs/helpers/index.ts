import { DisplayObject } from "pixi.js";

export const bringToFront = (obj: DisplayObject) => {
    if (obj.parent) {
        const children = obj.parent.children.filter(elem => elem !== obj);
        children.push(obj);
        obj.parent.children = children;
    }
};
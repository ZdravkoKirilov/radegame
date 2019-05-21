import { DisplayObject, Sprite, Graphics } from "pixi.js";
import { Component, RzStyles } from "@app/rendering";

export const bringToFront = (obj: DisplayObject) => {
    const parent = obj.parent;
    if (parent) {
        const length = parent.children.length;
        parent.setChildIndex(obj, length - 1);
    }
};

export const getValue = (value: any, prop: keyof RzStyles, comp: Component): any => {
    return value;
}

export const setProp = (comp: Component, prop: keyof RzStyles, value: string | number | number[]) => {
    const graphic: DisplayObject = comp.graphic;
    let result = getValue(value, prop, comp);

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

    if (prop === 'mask') {
        return applyMask(comp, value as number[]);
    }

    graphic[prop] = result;
    return result;
};

export const applyMask = (comp: Component, value: number[]) => {
    const { graphic, props } = comp;
    if (props.styles.mask) {
        if (value.length === 4) {
            const [x, y, width, height] = value;
            const mask = new Graphics();
            mask.beginFill(0x99ff99, 0);
            mask.drawRect(x, y, width, height);
            mask.endFill();
            graphic.mask = mask;
        }
        if (value.length === 3) {
            let [x, y, radius] = value;

            if (!x) {
                x = graphic.x + (graphic.width / 2);
            }
            if (!y) {
                y = graphic.y + (graphic.height / 2);
            }

            const circle = new Graphics();
            circle.beginFill(0x99ff99, 0);
            circle.drawCircle(50, 50, 100);
            circle.endFill();
            graphic.mask = circle;
        }

    }
};
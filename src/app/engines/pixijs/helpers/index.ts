import { DisplayObject, Sprite, Graphics } from "pixi.js";

import { Component, RzStyles, BasicComponent, toHexColor } from "@app/render-kit";

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

export const setProp = (comp: BasicComponent, prop: keyof RzStyles, value: string | number | number[]) => {
    const graphic: DisplayObject = comp.graphic;
    let result = getValue(value, prop, comp);

    if (prop === 'anchor') {
        const [x, y] = result.split(' ').map(elem => Number(elem));
        return (graphic as Sprite).anchor.set(x, y);
    }

    if (prop === 'pivot') {
        const [x, y] = result.split(' ').map(elem => Number(elem));
        graphic.pivot.x = x;
        graphic.pivot.y = y;
        return;
    }

    if (prop === 'skew') {
        const [x, y] = result.split(' ');
        return (graphic as Sprite).skew.set(x, y);
    }

    if (prop === 'scale') {
        const [x, y] = result.split(' ').map(elem => Number(elem));
        graphic.scale.x = x;
        graphic.scale.y = y;
        return;
    }

    if (prop === 'mask') {
        return applyMask(comp, value as number[]);
    }

    if (prop === 'stroke_color' || prop === 'fill') {
        result = toHexColor(result);
    }

    graphic[prop] = result;
    return result;
};

export const applyMask = (comp: BasicComponent, value: number[]) => {
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
            if (isNaN(Number(y))) {
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

const centeredRotation = (style: Partial<RzStyles>): Partial<RzStyles> => {
    if (!style.width || !style.height) {
        return {};
    }
    return {
        pivot: `${style.width / 2} ${style.height / 2}`,
        x: style.width / 2,
        y: style.height / 2,
    }
};

export const applyTransformations = (styles: Partial<RzStyles>): Partial<RzStyles> => {
    styles = styles || {};
    let copy = { ...styles };
    if (styles.rotation) {
        copy.rotation = copy.rotation * Math.PI / 180;
        copy = { ...copy, ...centeredRotation(styles) };
    }
    if (styles.stroke_color) {
        copy.stroke_color = toHexColor(styles.stroke_color);
    }
    if (styles.fill) {
        copy.fill = toHexColor(styles.stroke_color);
    }
    return copy;
};
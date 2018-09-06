import { DisplayObject } from "pixi.js";
import { isRelative, isCalculable, isSelector, getClosestContainer, Component } from "@app/rendering";

export const bringToFront = (obj: DisplayObject) => {
    if (obj.parent) {
        const children = obj.parent.children.filter(elem => elem !== obj);
        children.push(obj);
        obj.parent.children = children;
    }
};

export const computeRelativeValue = (comp: Component, prop: string, value: string): number => {
    const rawValue = Number(value.slice(0, -1));
    const container = getClosestContainer(comp);

    if (container) {
        const parentProp = REL_PROPS[prop];
        const parentPropValue = container[parentProp] || container[prop] || container.graphic.width;
        return parentPropValue * (rawValue / 100);
    }

    return null;
};

export const calcValue = (comp: Component, prop: string, value: string): number => {
    const asString = value
        .split(' ')
        .map(elem => {
            return isRelative(elem) ? computeRelativeValue(comp, prop, elem) : elem;
        })
        .join(' ');
    return eval(asString);
};

export const computeValueWithSelectos = () => {

};

export const getValue = (value: any, prop: string, comp: Component): any => {

    if (isRelative(value)) {
        return computeRelativeValue(comp, prop, value);
    }
    if (isSelector(value)) {

    }
    if (isCalculable(value)) {
        return calcValue(comp, prop, value);
    }
    return value;
}

export const setProp = (comp: Component, prop: string, value: string | number) => {
    const { graphic } = comp;
    const result = getValue(value, prop, comp);
    graphic[prop] = result;
    return result;
};

export const REL_PROPS = {
    x: 'width',
    y: 'height',
    width: 'width',
    height: 'height'
}
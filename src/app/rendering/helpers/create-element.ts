import { RzElementProps, RzElementChild, RzElement, isValidRzElement } from "../models";

export const createElement = (type: any, props: RzElementProps, ...children: RzElementChild[]): RzElement | null => {
    let elemChildren = children || [];
    let computedChildren = [];

    if (type === null) {
        return null;
    }

    elemChildren.forEach((elem, index) => {
        if (typeof elem === 'function') {
            const result = elem();
            if (isValidRzElement(result)) {
                computedChildren[index] = result;
                return;
            }
            throw new Error('Invalid RzElement returned from a RenderFunction');
        }
        if (Array.isArray(elem)) {
            elem.forEach(child => computedChildren.push(child));
            return;
        }
        return computedChildren[index] = elem;
    });

    return { type, props: props || {}, children: computedChildren as RzElement[] };
};
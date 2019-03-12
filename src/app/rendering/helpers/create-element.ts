import { RzElementProps, RzElementChild, RzElement, isValidRzElement, RzElementType } from "../models";

export const createElement = <T = {} & RzElementProps>(
    type: RzElementType<T>,
    props: T & RzElementProps,
    ...children: RzElementChild[]): RzElement | null => {
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

    return { type, props: props || {} as T, children: computedChildren as RzElement[] };
};
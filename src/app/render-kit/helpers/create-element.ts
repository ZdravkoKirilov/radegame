import { RzElementProps, RzElementChild, RzElement, RzElementType, RenderFunction } from "../models";

export const createElement = <T = {} & Partial<RzElementProps>>(
    type: RzElementType<T>,
    props?: T & RzElementProps,
    ...children: RzElementChild[] | RenderFunction[]
): RzElement | null => {
    children = children || [];
    props = props || {} as T;
    let computedChildren = [];

    if (type === null) {
        return null;
    }

    children.forEach((elem, index) => {
        if (Array.isArray(elem)) {
            elem.forEach((child: any) => computedChildren.push(child));
            return;
        }
        computedChildren[index] = elem;
    });

    props.children = computedChildren;

    return { type, props, children: computedChildren };
};
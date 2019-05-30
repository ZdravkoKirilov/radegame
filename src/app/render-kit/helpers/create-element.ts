import { RzElementProps, RzElementChild, RzElement, isValidRzElement, RzElementType, RenderFunction } from "../models";

export const createElement = <T = {} & Partial<RzElementProps>>(
    type: RzElementType<T>,
    props: T,
    ...children: RzElementChild[]
): RzElement | null => {
    children = children || [];
    let computedChildren = [];

    if (type === null) {
        return null;
    }

    children.forEach((elem, index) => {
        if (Array.isArray(elem)) {
            (elem as any).forEach((child: any) => computedChildren.push(child));
            return;
        }
        computedChildren[index] = elem;
    });

    return { type, props: props || {} as T, children: computedChildren as RzElement[] };
};
import { RzElementProps, RzNode, RzElement, RzElementType } from "../internal";

export const createElement = <T>(
    type: RzElementType<T>,
    props?: T & RzElementProps,
    ...children: RzNode[]
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

    props['children'] = computedChildren;

    return { type, props, children: computedChildren };
};
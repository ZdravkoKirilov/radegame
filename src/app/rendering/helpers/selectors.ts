import { Component } from "../models";

export const getClosestContainer = (start: Component): Component | null => {
    if (start.parent) {
        return start.parent.props.container ? start.parent : getClosestContainer(start.parent);
    }
    return null;
};

export const getSibling = (start: Component, name: string): Component | null => {
    if (start.parent && name) {
        return start.parent.children.find(elem => elem.props.name === name);
    }
    return null;
};

export const getChild = (start: Component, name: string): Component | null => {

    if (start.cachedSelectors[name]) {
        return start.cachedSelectors[name];
    }

    if (name) {
        const queue = [...start.children];
        let result: Component = null;
        let next;

        while (queue.length > 0) {
            next = queue.shift();

            if (next.props.name === name) {
                result = next;
                break;
            } else {
                for (var i = 0; i < next.children.length; i++) {
                    queue.push(next.children[i]);
                }
            }
        }
        start.cachedSelectors = start.cachedSelectors || {};
        start.cachedSelectors[name] = result;
        return result;
    }
    return null;
};

export const getParent = (start: Component, name: string): Component | null => {
    if (start.parent && name) {
        if (start.parent.props.name === name) {
            return start.parent
        } else {
            return getParent(start.parent, name);
        }
    }
    return null;
};

export const isSelector = (value: any): boolean => {
    return typeof value === 'string' && value.includes(SelectorPrefixes.child) || value.includes(SelectorPrefixes.sibling) ||
        value.includes(SelectorPrefixes.parent);
};

export const resolveSelectorValue = () => {

};

enum SelectorPrefixes {
    'child' = '@child',
    'sibling' = '@sibling',
    'parent' = '@parent'
}

'(@child.gosho.width / 2)' + 30;


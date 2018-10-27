import { Component } from "../models";
import { PropGetter } from "../interfaces";

export const getClosestContainer = (start: Component): Component | null => {
    if (start.parent) {
        return start.parent.props.container ? start.parent : getClosestContainer(start.parent);
    }
    return null;
};

const getSibling = (start: Component, name: string): Component | null => {
    if (start.parent && name) {
        return start.parent.children.find(elem => elem.props.name === name);
    }
    return null;
};

const getChild = (start: Component, name: string): Component | null => {

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

const getParent = (start: Component, name: string): Component | null => {
    if (start.parent && name) {
        if (start.parent.props.name === name) {
            return start.parent
        } else {
            return getParent(start.parent, name);
        }
    }
    return null;
};

const getTargetElement = (start: Component, name: string, selector: string): Component | Array<Component> | null => {
    if (selector.includes(SelectorPrefixes.child)) {
        return getChild(start, name);
    }
    if (selector.includes(SelectorPrefixes.parent)) {
        return getParent(start, name)
    }
    if (selector.includes(SelectorPrefixes.sibling)) {
        return getSibling(start, name);
    }
    if (selector.includes(SelectorPrefixes.children)) {
        return [...start.children];
    }
    return null;
};

export const isSelector = (value: any): boolean => {
    const isString = typeof value === 'string';
    const conditions = new Set([
        isString && value.includes(SelectorPrefixes.child),
        isString && value.includes(SelectorPrefixes.sibling),
        isString && value.includes(SelectorPrefixes.parent),
        isString && value.includes(SelectorPrefixes.children),
    ]);
    return conditions.has(true);
};

export const resolveSelectors = (comp: Component, value: string, propGetter: PropGetter): string => {

    while (isSelector(value)) {
        value = resolveSelector(comp, value, propGetter);
    }

    return value;
};

const resolveSelector = (comp: Component, value: string, propGetter: PropGetter, ): any => {
    const selectorStart = value.indexOf('@');
    const selectorEnd = value.indexOf(' ') || value.indexOf('+') || value.indexOf('-') ||
        value.indexOf('*') || value.indexOf('/') || value.indexOf(')') || value.length;
    const selector = value.substring(selectorStart, selectorEnd - 1).trim();
    const segments = selector.split('.');

    if (segments.length !== 3) {
        throw new Error('Invalid selector: ' + value);
    }

    const targetElementName = segments[1];
    const targetElement = getTargetElement(comp, targetElementName, selector);

    if (targetElement) {
        if (Array.isArray(targetElement)) { // '@children' selector has different segments
            const prop = segments[1];
            return targetElement.reduce((acc, elem) => {
                acc += propGetter(elem, prop);
                return acc;
            }, 0);
        } else {
            const targetElementProp = segments[2];
            return value.replace(new RegExp(selector, 'g'), propGetter(targetElement, targetElementProp));
        }

    }
};

enum SelectorPrefixes {
    'child' = '@child',
    'children' = '@children',
    'sibling' = '@sibling',
    'parent' = '@parent'
}

'(@child.gosho.width / 2)' + 30;

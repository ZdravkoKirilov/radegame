import get from 'lodash/get';

import { Component, RzElementType, RzElementProps, isRzElementType } from "../models";
import { Dictionary } from "@app/shared";

export const isDescendantOf = (target: Component, potentialParent: Component) => {
    if (target && potentialParent) {
        const isDirectChild = potentialParent.children.includes(target);
        return isDirectChild || potentialParent.children.some(child => isDescendantOf(target, child));
    }
    return false;
};

const matchByProp = (prop: Dictionary) => (target: Component) => {
    return Object.keys(prop).every(key => {
        const actualPropValue = get(target, ['props', ...key.split('.')]);
        return actualPropValue === prop[key];
    });
};

const matchByType = (type: RzElementType) => (target: Component) => {
    return get(target, 'type') === type;
};

export const findInDescendants = <T = Component>(startPoint: Component) => (criteria: Dictionary | RzElementType): T => {
    if (isRzElementType(criteria)) {
        const matcher = matchByType(criteria);
        return iterateUntil('child', matcher)(startPoint) as any;
    }
    if (typeof criteria === 'object' && Object.keys(criteria).length > 0) {
        const matcher = matchByProp(criteria);
        return iterateUntil('child', matcher)(startPoint) as any;
    }
    return null;
};

export const findInAncestors = <T = Component>(startPoint: Component) => (criteria: Dictionary | RzElementType): T => {
    if (isRzElementType(criteria)) {
        const matcher = matchByType(criteria);
        return iterateUntil('parent', matcher)(startPoint) as any;
    }
    if (typeof criteria === 'object' && Object.keys(criteria).length > 0) {
        const matcher = matchByProp(criteria);
        return iterateUntil('parent', matcher)(startPoint) as any;
    }
    return null;
};

export const findInSiblings = <T = Component>(startPoint: Component) => (criteria: Dictionary | RzElementType): T => {
    if (isRzElementType(criteria)) {
        const matcher = matchByType(criteria);
        return iterateUntil('sibling', matcher)(startPoint) as any;
    }
    if (typeof criteria === 'object' && Object.keys(criteria).length > 0) {
        const matcher = matchByProp(criteria);
        return iterateUntil('sibling', matcher)(startPoint) as any;
    }
    return null;
};

const iterateUntil = (direction: 'parent' | 'child' | 'sibling', matcher: (target: Component) => boolean) => (target: Component, recursive = true): Component | null => {
    if (direction === 'parent') {
        const parent = get(target, 'parent');
        if (parent) {
            if (matcher(parent)) {
                return parent;
            }
            return iterateUntil(direction, matcher)(parent);
        }
        return null;
    } else if (direction === 'child') {
        const children: Component[] = get(target, 'children', []);
        let firstMatch = children.find(child => matcher(child));
        if (recursive && !firstMatch) {
            let index = 0;
            while (!firstMatch && index < children.length) {
                firstMatch = iterateUntil(direction, matcher)(children[index], false);
            }
            if (!firstMatch) {
                index = 0;
                while (!firstMatch && index < children.length) {
                    firstMatch = iterateUntil(direction, matcher)(children[index]);
                }
            }
        }
        return firstMatch;
    } else { // sibling
        const allSiblings: Component[] = get(target, ['parent', 'children'], []);
        return allSiblings.find(sibling => matcher(sibling));
    }
};


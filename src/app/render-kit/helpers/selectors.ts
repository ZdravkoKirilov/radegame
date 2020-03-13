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

export const findInDescendants = (startPoint: Component) => (criteria: Dictionary | RzElementProps) => {
    if (isRzElementType(criteria)) {
        const matcher = matchByType(criteria);
        return iterateUntil('child', matcher)(startPoint);
    }
    if (typeof criteria === 'object' && Object.keys(criteria).length > 0) {
        const matcher = matchByProp(criteria);
        return iterateUntil('child', matcher)(startPoint);
    }
    return null;
};

export const findInAncestors = (startPoint: Component) => (criteria: Dictionary | RzElementProps) => {
    if (isRzElementType(criteria)) {
        const matcher = matchByType(criteria);
        return iterateUntil('parent', matcher)(startPoint);
    }
    if (typeof criteria === 'object' && Object.keys(criteria).length > 0) {
        const matcher = matchByProp(criteria);
        return iterateUntil('parent', matcher)(startPoint);
    }
    return null;
};

const iterateUntil = (direction: 'parent' | 'child', matcher: (target: Component) => boolean) => (target: Component): Component | null => {
    if (direction === 'parent') {
        const parent = get(target, 'parent');
        if (parent) {
            if (matcher(parent)) {
                return parent;
            }
            return iterateUntil(direction, matcher)(parent);
        }
        return null;
    } else {
        const children: Component[] = get(target, 'children', []);
        const firstMatch = children.find(child => {
            const childMatches = matcher(child);
            return childMatches ? child : get(child, 'children', []).find(child => iterateUntil(direction, matcher)(child))
        });
        return firstMatch;
    }
};


import { Component } from "../models";

export const withErrorPropagation = <T = any>(parent: Component, callback: Function): T => {
    try {
        const result = callback();
        return result;
    } catch (err) {
        let nextAncestor = parent;
        let stack = '';

        while (nextAncestor) {
            if ('didCatch' in nextAncestor && typeof nextAncestor['didCatch'] === 'function') {
                nextAncestor['didCatch'](err, stack);
                nextAncestor = null;
                return;
            } else {
                nextAncestor = nextAncestor.parent;
                stack += nextAncestor.type['name'];
            }
        }

        throw err;
    }

};
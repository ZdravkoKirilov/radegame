import { Component } from "../models";

export const withErrorPropagation = <T = any>(parent: Component, callback: Function): T => {
    try {
        const result = callback();
        return result;
    } catch (err) {
        let nextAncestor = parent;
        let stack = [];

        while (nextAncestor) {
            if ('didCatch' in nextAncestor && typeof nextAncestor['didCatch'] === 'function') {
                withErrorPropagation(nextAncestor.parent, () => nextAncestor['didCatch'](err, stack.reverse().join(' \n')));
                nextAncestor = null;
                return;
            } else {
                nextAncestor = nextAncestor.parent;
                const typeName = typeof nextAncestor.type === 'string' ?
                    nextAncestor.type :
                    nextAncestor.type['name'] || nextAncestor.type['displayName'];
                const givenName = nextAncestor.props.name || null;
                const composedName = givenName ? `${typeName}[${givenName}]` : '';
                stack.push(composedName || typeName || 'Anonymous');
            }
        }

        throw err;
    }

};
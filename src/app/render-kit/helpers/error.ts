import { get } from 'lodash';

import { Component } from "../internal";

export const callWithErrorPropagation = <ReturnType = any>(parent: Component | undefined, callback: Function): ReturnType | any => {
  try {
    const result = callback();
    return result as ReturnType;
  } catch (err) {
    let nextAncestor = parent as any;
    let stack = [] as any[];

    while (nextAncestor) {
      if ('didCatch' in nextAncestor && typeof nextAncestor['didCatch'] === 'function') {
        callWithErrorPropagation(nextAncestor.parent, () => nextAncestor['didCatch'](err, stack.reverse().join(' \n')));
        nextAncestor = null;
        return;
      } else {
        nextAncestor = nextAncestor.parent;
        const typeName = typeof get(nextAncestor, 'type') === 'string' ?
          nextAncestor.type :
          get(nextAncestor, ['type', 'name']) || get(nextAncestor, ['type', 'displayName']) || '';
        const givenName = get(nextAncestor, ['props', 'name']);
        const composedName = givenName ? `${typeName}[${givenName}]` : '';
        stack.push(composedName || typeName || 'Anonymous');
      }
    }

    throw err;
  }

};
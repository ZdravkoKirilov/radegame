import { get } from 'lodash';

import { Component, DidUpdatePayload } from "../models";
import { evaluate } from "@app/dynamic-forms";
import { Style } from '@app/game-mechanics';
import { removeEmptyProps } from '@app/shared';

const SPECIALS = {
    WILDCARD: '*',
    ENTER: ':enter',
    LEAVE: ':leave',
    FORWARDS: '=>',
    BIDIRECTIONAL: '<=>',
};

export const shouldTransition = (transition: string, prop: string, payload?: DidUpdatePayload, isEntering = false, isLeaving = false) => {
    const prev = payload.prev;
    const next = payload.next;
    const nextValue = get(next, prop);
    const prevValue = get(prev, prop);

    if (transition === SPECIALS.ENTER && isEntering) {
        return true;
    }

    if (transition === SPECIALS.LEAVE && isLeaving) {
        return true;
    }

    if (transition === SPECIALS.WILDCARD) {
        return get(prev, prop) !== get(next, prop);
    }

    const transitionArguments = transition.split(' ').filter(elem => !!elem).map(elem => elem.trim());
    const isForwards = transitionArguments[1] === SPECIALS.FORWARDS;
    const firstArg = transitionArguments[0];
    const lastArg = transitionArguments[2];
    let firstMatches: boolean;
    let lastMatches: boolean;

    if (isForwards) {
        firstMatches = firstArg === SPECIALS.WILDCARD || firstArg === prevValue;
        lastMatches = lastArg === SPECIALS.WILDCARD || lastArg === nextValue;
    } else {
        firstMatches = firstArg === SPECIALS.WILDCARD || firstArg === prevValue || firstArg === nextValue;
        lastMatches = lastArg === SPECIALS.WILDCARD || nextValue || prevValue;
    }

    return firstMatches && lastMatches;

};

export const extractTransitionValues = (
    prop: string,
    payload: DidUpdatePayload
) => {
    // const props = prop.split('.');
    // const prev = payload[props[0]].prev[props[1]];
    // const next = payload[props[0]].next[props[1]];

    return [1, 2];
};

const isSpecialValue = (value: string | number) => {
    return value && typeof value === 'string';
};

const parseSpecial = (source: string, prop: string, comp: Component) => {
    var start = source[0];
    const current = comp.props.styles[prop];

    if (start === SPECIALS.WILDCARD) {
        return current;
    }

    const result = evaluate(source, comp.props.styles);
    return result;
};

export const parseValue = (value: string | number, prop: string, comp: Component) => {
    if (isSpecialValue(value)) {
        return parseSpecial(value as string, prop, comp);
    }
    return value;
};

export const removeNonAnimatableProps = (source: Style) => {
    const copy = removeEmptyProps({...source});
    const animatable_props = new Set(['width', 'height']);

    for (let key in source) {
        if (!animatable_props.has(key)) {
            delete copy[key];
        }
    }
    return copy;
};
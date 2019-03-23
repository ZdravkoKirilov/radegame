import { Component, DidUpdatePayload } from "../models";
import { evaluate } from "@app/dynamic-forms";

const SPECIALS = {
    WILDCARD: '*',
    ENTER: ':enter',
    LEAVE: ':leave',
    FORWARDS: '=>',
    BIDIRECTIONAL: '<=>',
};

export const shouldTransition = (transition: string, prop: string, payload: DidUpdatePayload) => {
    const props = prop.split('.');
    const prev = payload[props[0]].prev[props[1]];
    const next = payload[props[0]].next[props[1]];

    if (transition === SPECIALS.WILDCARD) {
        return prev !== next;
    } else {
        const asArray = transition.split(' ').filter(elem => !!elem).map(elem => elem.trim());
        const isForwards = asArray[1] === SPECIALS.FORWARDS;
        const first = asArray[0];
        const last = asArray[2];
        let firstMatches: boolean;
        let lastMatches: boolean;

        if (isForwards) {
            firstMatches = first === SPECIALS.WILDCARD || first === prev;
            lastMatches = last === SPECIALS.WILDCARD || last === next;
        } else {
            firstMatches = first === SPECIALS.WILDCARD || first === prev || first === next;
            lastMatches = last === SPECIALS.WILDCARD || last === next || last === prev;
        }

        return firstMatches && lastMatches;
    }
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
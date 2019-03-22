import { Component, DidUpdatePayload } from "../models";

const SPECIALS = {
    PLUS: '+',
    MINUS: '-',
    WILDCARD: '*',
    ENTER: ':enter',
    LEAVE: ':leave',
    FORWARDS: '=>',
    BIDIRECTIONAL: '<=>',
    PERCENT: '%',
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

const parseSpecial = (data: string, prop: string, comp: Component) => {
    const sign = data[0];
    const valueAsString = data.slice(1);
    let valuePart = Number(valueAsString);
    const current = comp.props.styles[prop];

    if (isNaN(valuePart)) {
        if (valueAsString.endsWith(SPECIALS.PERCENT)) {
            valuePart = Number(valueAsString.slice(-1));
            if (isNaN(valuePart)) {
                throw new TypeError('Unrecognized animation value: ' + data);
            }
        } else {
            throw new TypeError('Unrecognized animation value: ' + data);
        }
    }

    if (sign === SPECIALS.PLUS) {
        return current + valuePart;
    }

    if (sign === SPECIALS.MINUS) {
        return current - valuePart;
    }

    if (sign === SPECIALS.WILDCARD) {
        return current;
    }
};

export const parseValue = (value: string | number, prop: string, comp: Component) => {
    if (isSpecialValue(value)) {
        return parseSpecial(value as string, prop, comp);
    }
    return value;
};
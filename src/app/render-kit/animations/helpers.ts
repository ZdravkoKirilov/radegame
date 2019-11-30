import { get } from 'lodash';

import { DidUpdatePayload, ComponentData } from "../models";
import { evaluate } from "@app/dynamic-forms";
import { Style, Animation, Transition, ExpressionContext, Expression, parseFromString } from '@app/game-mechanics';
import { removeEmptyProps, Dictionary, WithKeysAs } from '@app/shared';
import { toNumericColor } from '../helpers';

const SPECIALS = {
    WILDCARD: '*',
    ENTER: ':enter',
    LEAVE: ':leave',
    FORWARDS: '=>',
    BIDIRECTIONAL: '<=>',
};

export const ANIMATABLE_PROPS = {
    width: 'width',
    height: 'height',
    stroke_color: 'stroke_color',
    stroke_thickness: 'stroke_thickness',
    fill: 'fill',
    x: 'x',
    y: 'y'
} as const;

export type AnimatableProps = Partial<WithKeysAs<typeof ANIMATABLE_PROPS, string | number>>;

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
    const firstArg = patchBooleanValues(transitionArguments[0]);
    const lastArg = patchBooleanValues(transitionArguments[2]);
    let firstMatches: boolean;
    let lastMatches: boolean;

    if (isForwards) {
        firstMatches = firstArg === SPECIALS.WILDCARD || firstArg === prevValue;
        lastMatches = lastArg === SPECIALS.WILDCARD || lastArg === nextValue;
    } else {
        firstMatches = firstArg === SPECIALS.WILDCARD || firstArg === prevValue || firstArg === nextValue;
        lastMatches = lastArg === SPECIALS.WILDCARD || nextValue || prevValue;
    }

    return firstMatches && lastMatches && (prevValue !== nextValue);

};

const patchBooleanValues = (value: string) => {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return value;
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
    return value && typeof value === 'string' && !value.startsWith('#');
};

const parseBinding = (source: string, context: ComponentData) => {
    const nextBinding = source.indexOf('{');
    const endBinding = source.indexOf('}');
    const fullExpression = source.slice(nextBinding, endBinding + 1);
    const innerExpression = fullExpression.slice(1, -1);

    const value = evaluate(innerExpression, context);

    return source.replace(fullExpression, value);
};

const parseSpecial = (source: string, context: ComponentData) => {

    // while (source.indexOf('{') !== -1) {
    //     source = parseBinding(source, context);
    // }

    const result = evaluate(source, context);
    return result;
};

export const parseValue = (value: string, context: ComponentData, key: string) => {
    // if (key === ANIMATABLE_PROPS.stroke_color || key === ANIMATABLE_PROPS.fill) {
    //     return toNumericColor(value);
    // }
    if (isSpecialValue(value)) {
        return Number(parseSpecial(value, context));
    }
    return value;
};

const parsePropsData = (source: Dictionary, context: ComponentData) => {
    const result = {};

    for (let key in source) {
        let value = source[key];
        value = parseValue(value, context, key);
        result[key] = value;
    }

    return result;
};

export const parseAnimationValues = (animation: Animation, context: ComponentData) => {
    return {
        ...animation,
        steps: animation.steps.map(step => {
            step = {
                ...step,
                from_style: parsePropsData(step.from_style as Style, context),
                to_style: parsePropsData(step.to_style as Style, context),
            }
            return step;
        }),
    } as Animation;
};

export const removeNonAnimatableProps = (source: Style) => {
    const copy = removeEmptyProps({ ...source });

    for (let key in source) {
        if (!(key in ANIMATABLE_PROPS)) {
            delete copy[key];
        }
    }
    return copy;
};

export const isTransitionEnabled = (transition: Transition, context: ExpressionContext, data: Dictionary) => {
    if (transition.enabled && context && data) {
        const expression = transition.enabled as Expression;
        const callback = parseFromString(context)(expression.code) as Function;
        const enabled = callback.call(context, data);
        return enabled;
    }
    return true;
};
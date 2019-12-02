import { get } from 'lodash';

import { DidUpdatePayload } from "../models";
import { evaluate } from "@app/dynamic-forms";
import { Style, Animation, Transition, Expression, parseFromString } from '@app/game-mechanics';
import { removeEmptyProps, Dictionary, WithKeysAs } from '@app/shared';

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
    y: 'y',
    font_size: 'font_size',
} as const;

export type AnimatableProps = Partial<WithKeysAs<typeof ANIMATABLE_PROPS, string | number>>;

export const shouldTransition = (trigger: string, payload?: DidUpdatePayload, isEntering = false, isLeaving = false) => {
    if (trigger) {
        const shouldTransition = parseFromString<Function>(payload)(trigger)();
        return shouldTransition;
    }
    return false;
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

const isSpecialValue = (value: string | number) => {
    return value && typeof value === 'string' && !value.startsWith('#');
};

const parseBinding = (source: string, context: Dictionary) => {
    const nextBinding = source.indexOf('{');
    const endBinding = source.indexOf('}');
    const fullExpression = source.slice(nextBinding, endBinding + 1);
    const innerExpression = fullExpression.slice(1, -1);

    const value = evaluate(innerExpression, context);

    return source.replace(fullExpression, value);
};

const parseSpecial = (source: string, context: Dictionary) => {

    // while (source.indexOf('{') !== -1) {
    //     source = parseBinding(source, context);
    // }

    const result = evaluate(source, context);
    return result;
};

export const parseValue = (value: string, context: Dictionary, key: string) => {
    // if (key === ANIMATABLE_PROPS.stroke_color || key === ANIMATABLE_PROPS.fill) {
    //     return toNumericColor(value);
    // }
    if (isSpecialValue(value)) {
        return Number(parseSpecial(value, context));
    }
    return value;
};

const parsePropsData = (source: Dictionary, context: Dictionary) => {
    const result = {};

    for (let key in source) {
        let value = source[key];
        value = parseValue(value, context, key);
        result[key] = value;
    }

    return result;
};

export const parseAnimationValues = (animation: Animation, context: Dictionary) => {
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

export const isTransitionEnabled = (transition: Transition, context: Dictionary, data: Dictionary) => {
    if (transition.enabled && context && data) {
        const expression = transition.enabled as Expression;
        const callback = parseFromString(context)(expression.code) as Function;
        const enabled = callback.call(context, data);
        return enabled;
    }
    return true;
};
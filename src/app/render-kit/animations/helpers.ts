import { DidUpdatePayload } from "../models";
import { Style, Transition, Expression, parseFromString } from '@app/game-mechanics';
import { removeEmptyProps, Dictionary, WithKeysAs } from '@app/shared';

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
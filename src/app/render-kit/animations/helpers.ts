import { DidUpdatePayload } from "../models";
import { Style, Transition, Expression, parseFromString, RuntimeTransition, ParamedExpressionFunc } from '@app/game-mechanics';
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

export const shouldTransition = (
    trigger: ParamedExpressionFunc<DidUpdatePayload, boolean>,
    payload: DidUpdatePayload,
) => {
    if (trigger) {
        return trigger(payload);
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

export const isTransitionEnabled = (transition: RuntimeTransition, data: Dictionary) => {
    if (transition.enabled) {
        return transition.enabled(data);
    }
    return true;
};
import { AnimationBase } from "./base";
import { Styles } from "../models";
import { Easing } from "@tweenjs/tween.js";

export const composeFadeAnimation = <T = Partial<Styles>>(
    id: string | number
): AnimationBase => {
    return new AnimationBase(
        id, { alpha: 0 }, { alpha: 1 },
        Easing.Exponential.InOut, 300
    );
};
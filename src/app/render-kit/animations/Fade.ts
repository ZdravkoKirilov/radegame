import { AnimationBase } from "./base";
import { Easing } from "@tweenjs/tween.js";

export const createFadeInAnimation = () => {
    return new AnimationBase({
        easing: Easing.Cubic.InOut,
        timing: 3000,
        expected: { alpha: .8 },
        initial: { alpha: 1 },
        // yoyo: true,
        // repeat: Infinity,
    });
};

export const createBounceAnimation = () => {
    return new AnimationBase({
        easing: Easing.Bounce.Out,
        timing: 3000,
        expected: { x: '(x - x) + 50' },
        initial: { x: 1200 },
        // yoyo: true,
        // repeat: Infinity
    });
};

export const createUpliftAnimation = () => {
    return new AnimationBase({
        easing: Easing.Elastic.InOut,
        timing: 3000,
        expected: { y: 'y - 200' },
        initial: { y: '*' }
    });
};

// export const createScaleAnimation = (id: string | number) => {
//     return new AnimationBase({
//         id,
//         Easing.Exponential.InOut,
//         2000,
//         { scale: 1 },
//         { scale: 0 }
//     });
// };
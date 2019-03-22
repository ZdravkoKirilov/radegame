import { AnimationBase } from "./base";
import { Easing } from "@tweenjs/tween.js";

export const createFadeInAnimation = (id: string | number) => {
    return new AnimationBase({
        easing: Easing.Cubic.InOut,
        timing: 300,
        expected: { alpha: 1 },
        initial: { alpha: 0.8 }
    });
};

// export const createBounceAnimation = (id: string | number) => {
//     return new AnimationBase({
//         id,
//         Easing.Bounce.InOut,
//         3000,
//         { x: 100 },
//         { x: 1200 }
//      } );
// };

// export const createScaleAnimation = (id: string | number) => {
//     return new AnimationBase({
//         id,
//         Easing.Exponential.InOut,
//         2000,
//         { scale: 1 },
//         { scale: 0 }
//     });
// };
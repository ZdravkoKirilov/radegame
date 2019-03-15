import { Tween } from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { Component, Styles } from "../models";

export class AnimationBase<T = Partial<Styles>> {
    tween: Tween;
    target: Component;

    complete$ = new Subject();
    start$ = new Subject();
    pause$ = new Subject();

    constructor(
        public id: string | number,
        public initial: T,
        public expected: T,
        public easing: (data: number) => number,
        public timing: number
    ) {
        this.tween = new Tween(this.initial)
            .to(this.expected, this.timing)
            .easing(this.easing)
            .onUpdate((data: T) => {
                const keys: string[] = Object.keys(data);

                keys.forEach(key => {
                    this.target.setProps({
                        styles: {
                            ...this.target.props.styles,
                            [key]: data[key]
                        }
                    })
                });
            })
            .onComplete(() => {
                this.complete$.next();
            })
    }

    play(target: Component) {
        this.target = target;
        this.tween.start();
        this.start$.next();
    }

    stop() {
        this.tween.stop();
        this.pause$.next();
    }
}
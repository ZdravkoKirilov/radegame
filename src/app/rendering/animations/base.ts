import { Tween } from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { Component, Styles } from "../models";

export type AnimationConfig = {
    id: string | number;
    transition: string;
    prop: string;
    animation: AnimationBase;
}
export class AnimationBase<T = Partial<Styles>> {
    private components: Set<Component> = new Set();
    private active: Array<{
        tween: Tween;
        component: Component;
    }> = [];

    addComponent(component: Component) {
        this.components.add(component);
    }

    removeComponent(component: Component) {
        this.components.delete(component);
    }

    isAnimating(component: Component) {
        return this.active.some(elem => elem.component === component);
    }

    complete$ = new Subject<Component>();
    start$ = new Subject<Component>();
    pause$ = new Subject<Component>();

    constructor(
        public id: string | number,
        public easing: (data: number) => number,
        public timing: number,
        public expected?: T,
        public initial?: T,
    ) { }

    play(target: Component) {
        const tween = new Tween(this.initial)
            .to(this.expected, this.timing)
            .easing(this.easing)
            .onUpdate((data: T) => {
                const keys = Object.keys(data);
                keys.forEach(key => {
                    target.setProps({
                        styles: {
                            ...target.props.styles,
                            [key]: data[key]
                        }
                    })
                });
            })
            .onComplete(() => {
                this.complete$.next(target);
            });

        this.active.push({
            tween, component: target
        });

        tween.repeat(Infinity);
        tween.yoyo(true);

        tween.start();
    }

    stop() {

    }
}

// TODO: * syntax for taking the current value as initial
// +500 syntax - taking the current value and adding 500 to it as expected value
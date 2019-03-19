import { Tween } from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { Component, Styles } from "../models";

export class AnimationGroup {
    type: 'parallel' | 'sequence' | 'exclusive';
    transition: string;   // done => undone, hot <=> cold etc.
    prop: string;   //  state.pesho, props.gosho
    animations: AnimationBase[];
    gap?: number; // in case of type=sequence

    async playAll() {
        if (this.type === 'parallel') {
            return Promise.all(this.animations.map(animation => animation.playAll()));
        }
    }
}

// Note to myself: pass the animation object directly to children
// then children .push directly themselves into the components[] of the animation
// then the parent component -> onUpdate - animations.forEach -> playAll()

export type AnimationConfig<T> = {
    id: string | number,
    easing: (data: number) => number,
    timing: number,
    expected?: T,
    initial?: T,
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

    playAll() {
        return Promise.all(Array.from(this.components).map(comp => this.play(comp)));
    }

    play(target: Component) {
        return new Promise((resolve) => {
            const tween = new Tween(this.initial)
                .to(this.expected, this.timing)
                .easing(this.easing)
                .onUpdate((data: T) => {
                    this.update(target, data);
                })
                .onComplete(() => {
                    this.complete$.next(target);
                    resolve(target);
                });

            this.active.push({
                tween, component: target
            });

            // tween.repeat(Infinity);
            // tween.yoyo(true);

            tween.start();
        });
    }

    update(target: Component, data: T) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            target.setProps({
                styles: {
                    ...target.props.styles,
                    [key]: data[key]
                }
            })
        });
    }

    stop() {

    }
}

// TODO: * syntax for taking the current value as initial
// +500 / -500 syntax - taking the current value and adding 500 to it as expected value
// @id.width
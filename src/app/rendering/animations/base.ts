import { Tween } from "@tweenjs/tween.js";

import { Component, Styles, DidUpdatePayload } from "../models";
import { parseValue } from "./helpers";

export class AnimationOrchestrator {
    type: 'parallel' | 'exclusive';
    groups: AnimationGroup[];

    checkAll(data: DidUpdatePayload) {
        const eligibleGroups = this.groups.filter(group => group.isEligible(data));
        return eligibleGroups;
    }

    playAll(groups: AnimationGroup[]) {
        return Promise.all([...groups.map(group => group.playAll())])
    }

    playAllEligible(data: DidUpdatePayload) {
        const eligible = this.checkAll(data);

        if (this.type === 'exclusive') {
            this.stopOthers(eligible);
        }
        return this.playAll(eligible);
    }

    stopOthers(exceptions: AnimationGroup[]) {
        return this.groups.forEach(elem => {
            if (exceptions.indexOf(elem) === -1) {
                elem.stopAll();
            }
        });
    }
}


export class AnimationGroup {
    type: 'parallel' | 'sequence';
    transition: string;   // done => undone, hot <=> cold etc.
    prop: string;   //  state.pesho, props.gosho
    animations: AnimationBase[];

    async playAll() {
        if (this.type === 'parallel') {
            return Promise.all(this.animations.map(animation => animation.playAll()));
        } else { // sequence
            return this.animations.reduce((total, animation) => {
                return animation.playAll();
            }, Promise.all([]));
        }
    }

    async playIfEligible(data: DidUpdatePayload) {
        if (this.isEligible(data)) {
            return this.playAll();
        } else {
            return Promise.resolve();
        }
    }

    isEligible(data: DidUpdatePayload) {
        return true;
    }

    stopAll() {
        return this.animations.forEach(animation => animation.stop());
    }
}

export class AnimationBase<T = Partial<Styles>> {

    private components: Set<Component> = new Set();
    private active: Array<{
        tween: Tween;
        component: Component;
    }> = [];

    constructor(private config: AnimationConfig) { }

    addComponent(component: Component) {
        this.components.add(component);
    }

    removeComponent(component: Component) {
        this.components.delete(component);
    }

    isAnimating(component: Component) {
        return this.active.some(elem => elem.component === component);
    }

    playAll() {
        return Promise.all(Array.from(this.components).map(comp => this.play(comp)));
    }

    play(target: Component) {
        let { expected, initial, timing, easing, repeat = 0, delay = 0, yoyo = false } = this.config;

        expected = this.parseValues(expected, target);
        initial = this.parseValues(initial, target);

        return new Promise((resolve) => {
            const tween = new Tween(initial)
                .to(expected, timing)
                .easing(easing)
                .delay(delay)
                .onUpdate((data: T) => {
                    this.update(target, data);
                })
                .onStop(() => {

                })
                .onComplete(() => {
                    resolve(target);
                });

            this.active.push({
                tween, component: target
            });

            tween.repeat(repeat);
            tween.yoyo(yoyo);

            tween.start();
        });
    }

    parseValues(from: Partial<Styles>, comp: Component) {
        const transformed = Object.keys(from).reduce((acc, key) => {
            const value = parseValue(from[key]);

            acc[key] = value;
            return acc;
        }, {});


        return transformed;
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
        this.active.forEach(({ tween }) => tween.stop());
        this.active = [];
    }
}

// TODO: * syntax for taking the current value as initial
// +500 / -500 syntax - taking the current value and adding 500 to it as expected value
// @id.width

export function WithAnimations(animations: AnimationGroup[] = []) {

    return function (constructor) {
        const original = constructor.prototype.didUpdate;

        constructor.prototype.didUpdate = function (data: DidUpdatePayload) {
            animations.forEach(animation => animation.playIfEligible(data));
            original && typeof original === 'function' && original.apply(this, arguments);
        };
        constructor.prototype.animations = animations;
    }
}

export type AnimationConfig<T = any> = {
    id: string | number,
    easing: (data: number) => number,
    timing: number,
    expected?: T,
    initial?: T,
    repeat?: number;
    yoyo?: boolean;
    delay?: number;
}

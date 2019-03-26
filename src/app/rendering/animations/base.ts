import { Tween } from "@tweenjs/tween.js";

import { Component, Styles, DidUpdatePayload } from "../models";
import { parseValue, shouldTransition, extractTransitionValues } from "./helpers";

export const createOrchestrator = (type: 'parallel' | 'exclusive', groups: AnimationGroup[]) => {
    return new AnimationOrchestrator(type, groups);
};

export const createAnimationGroup = (
    type: 'parallel' | 'sequence',
    transition: string,
    prop: string,
    animations: AnimationBase[]
) => {
    return new AnimationGroup(type, transition, prop, animations);
};

export class AnimationOrchestrator {

    constructor(private type: 'parallel' | 'exclusive', private groups: AnimationGroup[]) { }


    playAllEligible(data: DidUpdatePayload) {
        const eligible = this.checkAll(data);

        if (this.type === 'exclusive') {
            this.stopOthers(eligible);
        }
        return this.playAll(eligible, data);
    }

    checkAll(data: DidUpdatePayload) {
        const eligibleGroups = this.groups.filter(group => group.isEligible(data));
        return eligibleGroups;
    }

    playAll(groups: AnimationGroup[], data: DidUpdatePayload) {
        return Promise.all([...groups.map(group => group.playIfEligible(data))]);
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
    constructor(
        private type: 'parallel' | 'sequence',
        private transition: string,   // done => undone, hot <=> cold etc.
        private prop: string,   //  state.pesho, props.gosho
        private animations: AnimationBase[]
    ) { }

    async playAll(data?: any[]) {
        if (this.type === 'parallel') {
            return Promise.all(this.animations.map(animation => animation.playAll(data)));
        } else { // sequence
            return new Promise(resolve => {
                this.playSequence(this.animations, data, resolve);
            });
        }
    }

    playSequence(animations: AnimationBase[], data: any[], resolve: Function) {
        const animationsCopy = [...animations];

        if (animationsCopy.length) {
            const nextAnimation = animationsCopy.shift();
            nextAnimation.playAll(data).then(() => {
                this.playSequence(animationsCopy, data, resolve);
            });
        } else {
            resolve();
        }
    }

    playIfEligible(data: DidUpdatePayload) {
        if (this.isEligible(data)) {
            return this.playAll(extractTransitionValues(this.prop, data));
        } else {
            return Promise.resolve([]);
        }
    }

    isEligible(data: DidUpdatePayload) {
        return shouldTransition(this.transition, this.prop, data);
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

    playAll(data?: any[]) {
        if (this.config.staggerBy) {
            return this.playStagger(Array.from(this.components));
        } else {
            return Promise.all(Array.from(this.components).map(comp => this.play(comp)));
        }
    }

    playStagger(components: Component[]) {
        let delay = 0;
        const promises = components.map(comp => {
            const promise = this.play(comp, delay);
            delay += this.config.staggerBy;
            return promise;
        });

        return Promise.all(promises);
    }

    play(target: Component, enforcedDelay = 0, data?: any[]) {
        let { expected, initial, timing, easing,
            repeat = 0, delay = 0, yoyo = false,
            dynamic = false, dynamicProp = '' } = this.config;

        expected = dynamic ? {[dynamicProp]: data[1]} : this.parseValues(expected, target);
        initial = this.parseValues(initial, target);

        return new Promise((resolve) => {
            const tween = new Tween(initial)
                .to(expected, timing)
                .easing(easing)
                .delay(enforcedDelay || delay)
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
            const value = parseValue(from[key], key, comp);
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

export function WithAnimations(animations: AnimationOrchestrator[] = []) {

    return function (constructor) {
        const original = constructor.prototype.didUpdate;
        constructor.prototype.didUpdate = function (data: DidUpdatePayload) {
            animations.forEach(animation => animation.playAllEligible(data));
            original && typeof original === 'function' && original.apply(this, arguments);
        };
        constructor.animations = animations;
    }
}

export type AnimationConfig<T = any> = {
    easing: (data: number) => number,
    timing: number,
    expected?: T,
    dynamic?: boolean,
    dynamicProp?: string,
    initial?: T,
    repeat?: number;
    yoyo?: boolean;
    delay?: number;
    staggerBy?: number;
}

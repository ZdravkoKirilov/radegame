import { isEqual } from 'lodash';
import { RenderFunctionExtras, RenderFunction, MetaProps } from "../models";
import { updateComponent } from "./mutation";

export type StateHook = <T = any>(initialValue?: T) => [T, (value: T) => void];
export type EffectHook = (callback: () => FuncOrVoid, dependencies?: any[]) => void;

type FuncOrVoid = Function | void;

type StateHookParams = {
    callback: () => FuncOrVoid;
    dependencies: any[];
    cleaner?: Function | void;
};

export type StateHooks = Map<RenderFunction, any[]>;
export type EffectHooks = Map<RenderFunction, StateHookParams[]>;

export const prepareExtras = (target: RenderFunction, meta: MetaProps): RenderFunctionExtras => {
    let stateHookIndex = 0;
    let effectHookIndex = 0;

    const useState: StateHook = <T = any>(initialState?: T) => {
        const state = meta.hooks.state.get(target) || [];
        meta.hooks.state.set(target, state);
        const currentValue = state[stateHookIndex] || initialState;
        const mutator = (order: number) => (value: T) => {
            state[order] = value;
            const rendered = target(target.props, prepareExtras(target, meta));
            updateComponent(target, rendered);
        };
        const data: [T, (value: T) => void] = [currentValue, mutator(stateHookIndex)];
        stateHookIndex += 1;
        return data;
    };

    const useEffect: EffectHook = (callback, dependencies) => {
        const effects = meta.hooks.effect;
        const state = effects.get(target) || [];
        effects.set(target, state);
        const currentTarget = state[effectHookIndex];

        if (currentTarget) {
            const oldDeps = currentTarget.dependencies;
            if (!dependencies) {
                executeEffectAsync(state, effectHookIndex, callback, dependencies, currentTarget.cleaner);
            } else if (dependencies.length > 0 && !isEqual(oldDeps, dependencies)) {
                executeEffectAsync(state, effectHookIndex, callback, dependencies, currentTarget.cleaner);
            } else {
                // ignore the case when dependencies are empty or haven't changed
            }
        } else { // first fire is free
            executeEffectAsync(state, effectHookIndex, callback, dependencies);
        }
        effectHookIndex += 1;
    };

    return { useState, useEffect };
};

export const cleanEffectHooks = (component: RenderFunction) => {
    const effects = component.meta.hooks.effect.get(component);
    if (effects) {
        effects.forEach(params => {
            if (typeof params.cleaner === 'function') {
                params.cleaner();
            }
        });
        component.meta.hooks.effect.delete(component);
    }
};

const executeEffectAsync = (
    state: StateHookParams[],
    effectHookIndex: number,
    callback: () => FuncOrVoid,
    dependencies: any[],
    clean?: Function | void
) => {
    setTimeout(() => {
        if (typeof clean === 'function') {
            clean();
        }
        state[effectHookIndex] = {
            callback,
            dependencies,
            cleaner: callback(),
        };
    });
};
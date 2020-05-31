import { isEqual } from 'lodash';

import { RenderFunctionExtras, RenderFunction, MetaProps, updateComponent, callWithErrorPropagation } from "../internal";

export type StateHook = <T = any>(initialValue?: T) => [T, UseStateUpdater<T>];
export type EffectHook = (callback: () => FuncOrVoid, dependencies?: any[]) => void;
export type MemoHook = <T = any>(initialValue: T, dependencies: any[]) => T;
export type RefHook = <T = any>(initialValue?: T) => RefObject<T>;

type FuncOrVoid = Function | void;

type EffectHookParams = {
    callback: () => FuncOrVoid;
    dependencies: any[];
    cleaner?: Function | void;
};

type MemoHookParams<T = any> = {
    value: T;
    dependencies: any[];
}

export type RefObject<T = any> = { current: T };

export type StateHooks = Map<RenderFunction, any[]>;
export type EffectHooks = Map<RenderFunction, EffectHookParams[]>;
export type MemoHooks = Map<RenderFunction, MemoHookParams[]>;
export type RefHooks = Map<RenderFunction, RefObject[]>;

type UseStateFunctionalUpdater<T> = (oldValue: T) => T;
type UseStateUpdater<T> = (value: T | UseStateFunctionalUpdater<T>) => void;

export const prepareExtras = (target: RenderFunction, meta: MetaProps): RenderFunctionExtras => {
    let stateHookIndex = 0;
    let effectHookIndex = 0;
    let memoHookIndex = 0;
    let refHookIndex = 0;

    const useRef: RefHook = <T = any>(value?: T): RefObject<T> => {
        const refs = meta.hooks.refs;
        const state = refs.get(target) || [];
        refs.set(target, state);
        const currentValue = state[refHookIndex] || { current: value };
        state[refHookIndex] = currentValue;
        refHookIndex += 1;
        return currentValue;
    };

    const useMemo: MemoHook = <T>(value: T, dependencies) => {
        const memos = meta.hooks.memos;
        const state = memos.get(target) || [];
        memos.set(target, state);
        const currentTarget = state[memoHookIndex];

        if (currentTarget) {
            const oldDeps = currentTarget.dependencies;
            if (!dependencies) {
                state[memoHookIndex] = { value, dependencies };
            } else if (dependencies.length > 0 && !isEqual(oldDeps, dependencies)) {
                state[memoHookIndex] = { value, dependencies };
            } else {
                // ignore the case when dependencies are empty or haven't changed
            }
        } else { // first fire is free
            state[memoHookIndex] = { value, dependencies };
        }
        const returnValue = state[memoHookIndex].value;
        memoHookIndex += 1;
        return returnValue;
    };

    const useState: StateHook = <T = any>(initialState?: T) => {
        const state = meta.hooks.state.get(target) || [];
        meta.hooks.state.set(target, state);
        const currentValue = state[stateHookIndex] || initialState;
        const mutator = (order: number): UseStateUpdater<T> => (value) => {
            setTimeout(() => {
                if (typeof value === 'function') {
                    state[order] = (value as UseStateFunctionalUpdater<T>)(currentValue);
                } else {
                    state[order] = value;
                }
                const rendered = callWithErrorPropagation(target.parent, () => target(target.props, prepareExtras(target, meta)));
                updateComponent(target, rendered);
            });
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

    return { useState, useEffect, useMemo, useRef };
};

export const cleanAllHooks = (component: RenderFunction, meta: MetaProps) => {
    component.meta.hooks.state.delete(component);
    component.meta.hooks.memos.delete(component);
    component.meta.hooks.refs.delete(component);
    cleanEffectHooks(component);
}

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
    state: EffectHookParams[],
    effectHookIndex: number,
    callback: () => FuncOrVoid,
    dependencies: any[],
    clean?: Function | void
) => {
    if (typeof clean === 'function') {
        clean();
    }
    setTimeout(() => {
        state[effectHookIndex] = {
            callback,
            dependencies,
            cleaner: callback(),
        };
    });
};
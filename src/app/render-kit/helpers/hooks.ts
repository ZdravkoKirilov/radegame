import { RenderFunctionExtras, RenderFunction, MetaProps, StateHook } from "../models";
import { updateComponent } from "./mutation";

export const prepareExtras = (target: RenderFunction, meta: MetaProps): RenderFunctionExtras => {
    let index = 0;

    const useState: StateHook = <T = any>(initialState?: T) => {
        const state = meta.hooks.get(target) || [];
        meta.hooks.set(target, state);
        const currentValue = state[index] || initialState;
        const mutator = (order: number) => (value: T) => {
            state[order] = value;
            const rendered = target(target.props, prepareExtras(target, meta));
            updateComponent(target, rendered);
        };
        const data: [T, (value: T) => void] = [currentValue, mutator(index)];
        index += 1;
        return data;
    };

    return { useState };
};
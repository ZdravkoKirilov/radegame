import { Component } from "../models";

export abstract class AbstractMutator {
    abstract updateComponent(component: Component): void;

    abstract removeComponent(component: Component): void;

    abstract getProp: PropGetter;
};

export type PropGetter = (comp: Component, prop: string) => any;
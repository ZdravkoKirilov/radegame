import { Component } from "../models";
import { BasicComponent } from "../bases";

export abstract class AbstractMutator {
    abstract updateComponent(component: BasicComponent): void;

    abstract removeComponent(component: BasicComponent): void;

    abstract getProp: PropGetter;
};

export type PropGetter = (comp: Component, prop: string) => any;
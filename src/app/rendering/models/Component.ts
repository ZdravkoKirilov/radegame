import { BasicComponent, FunctionalComponent, StatefulComponent } from "../mixins";
import { RzElementProps } from "./RzElement";
import { AbstractContainer } from "../interfaces";

export type CompositeComponent = FunctionalComponent<Partial<RzElementProps>> |
    StatefulComponent<Partial<RzElementProps>, {}>;
export type Component = BasicComponent<Partial<RzElementProps>> | CompositeComponent;

export type ComponentList = { [key: string]: Component };

export interface Lifecycles<T = any, S = any> {
    willReceiveProps?: (props: T) => void;
    willMount?: () => void;
    didMount?: () => void;
    willUnmount?: () => void;
    didUpdate?: (data: DidUpdatePayload<T, S>) => void;
};

export type DidUpdatePayload<T = any, S = any> = {
    props?: {
        prev: T,
        next: T
    },
    state?: {
        prev: S,
        next: S
    }
}

export interface ComponentConstructor<T = any> {
    new(props: Partial<RzElementProps> & T, graphic: any, container: AbstractContainer): Component;
}
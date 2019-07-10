import { BasicComponent, StatefulComponent } from "../bases";
import { RzElementProps, MetaProps, RzElement } from "./RzElement";
import { AbstractContainer } from "../interfaces";

export type CompositeComponent = StatefulComponent | RenderFunction;

export type Component<T extends RzElementProps = {}> = BasicComponent<T> | StatefulComponent<T> | RenderFunction<T>;

export type ClassComponent<T extends RzElementProps = {}> = BasicComponent<T> | StatefulComponent<T>;

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

export interface ComponentConstructor<T extends RzElementProps = {}> {
    new(props: T, graphic: any, container: AbstractContainer): StatefulComponent;
}

export type ShouldUpdateCheck<T extends RzElementProps = {}> = ((prevProps: T, nextProps: T) => boolean) | Array<keyof T>;
type Render<T> = (props?: T, extras?: RenderFunctionExtras) => RzElement;

export type RenderFunction<T = {}> = Render<T & RzElementProps> & Partial<{
    container: AbstractContainer;
    children: any[];
    props: T & RzElementProps;
    meta: MetaProps;
    type: RenderFunction<T>;
}>

export type StateHook = <T = any>(initialValue?: T) => [T, (value: T) => void];

export type RenderFunctionExtras = {
    useState: StateHook;
}
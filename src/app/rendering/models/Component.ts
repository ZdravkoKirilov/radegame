import { BasicComponent, FunctionalComponent, StatefulComponent } from "../mixins";
import { RzElementProps } from "./RzElement";
import { AbstractContainer } from "../interfaces";

export type CompositeComponent = FunctionalComponent<RzElementProps> | StatefulComponent<RzElementProps, any>;
export type Component = BasicComponent<any> | CompositeComponent;

export type ComponentList = { [key: string]: Component };

export interface Lifecycles<T = any> {
    willReceiveProps?: (props: T) => void;
    willMount?: () => void;
    didMount?: () => void;
    willUnmount?: () => void;
    didUpdate?: () => void;
};

export interface ComponentConstructor<T = any> {
    new(props: RzElementProps & T, graphic: any, container: AbstractContainer): Component;
}
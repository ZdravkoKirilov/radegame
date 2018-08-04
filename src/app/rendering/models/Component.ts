import { BasicComponent, FunctionalComponent, StatefulComponent } from "../mixins";
import { RzElementProps } from "./RzElement";
import { AbstractContainer } from "../interfaces";

export type CompositeComponent = FunctionalComponent<RzElementProps> | StatefulComponent<RzElementProps, any>;
export type Component = BasicComponent | CompositeComponent;

export type ComponentList = { [key: string]: Component };

export interface Lifecycles {
    willReceiveProps?: (props: any) => void;
    willMount?: () => void;
    didMount?: () => void;
    willUnmount?: () => void;
    didUpdate?: () => void;
};

export interface ComponentConstructor {
    new(props: RzElementProps, graphic: any, container: AbstractContainer): Component;
}
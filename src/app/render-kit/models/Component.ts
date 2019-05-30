import { BasicComponent, StatefulComponent } from "../bases";
import { RzElementProps } from "./RzElement";
import { AbstractContainer } from "../interfaces";
import { RzElement } from "@app/rendering";

export type CompositeComponent = StatefulComponent | RenderFunction;

export type Component = BasicComponent | StatefulComponent | RenderFunction;

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

export type ShouldUpdateCheck<T extends RzElementProps = {}> = (prevProps: T, nextProps: T) => boolean;

type Render<T> = (props?: T) => RzElement;

export type RenderFunction<T extends RzElementProps = {}> = Render<T> & {
    container: AbstractContainer;
    children: any[];
    props: T;
}
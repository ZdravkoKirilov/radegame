import {
    BasicComponent, StatefulComponent, RzElementProps, MetaProps, RzElement, AbstractContainer, StateHook,
    EffectHook, MemoHook, RefHook
} from "../internal";

export type CompositeComponent = StatefulComponent | RenderFunction;

export type Component<T extends RzElementProps = {}> = BasicComponent<T> | StatefulComponent<T> | RenderFunction<T>;

export type ClassComponent<T extends RzElementProps = {}> = BasicComponent<T> | StatefulComponent<T>;

export type DidUpdatePayload<Props = any, State = any> = {
    prev: {
        state: State;
        props: Props;
    };
    next: {
        state: State;
        props: Props;
    };
}

export interface ComponentConstructor<T extends RzElementProps = {}> {
    new(props: T, graphic: any, container: AbstractContainer): StatefulComponent;
}

export type ShouldUpdateCheck<T extends RzElementProps = {}> = ((prevProps: T, nextProps: T) => boolean) | Array<string>;
type Render<T> = (props?: T, extras?: RenderFunctionExtras) => RzElement;

export type RenderFunction<T = {}> = Render<T & RzElementProps> & Partial<{
    container: AbstractContainer;
    children: any[];
    props: T & RzElementProps;
    meta: MetaProps;
    type: RenderFunction<T>;
    parent: Component;
    displayName: string;
}>

export type RenderFunctionExtras = {
    useState: StateHook;
    useEffect: EffectHook;
    useMemo: MemoHook;
    useRef: RefHook;
}

export type AbstractGraphic = {
    component: BasicComponent;
}
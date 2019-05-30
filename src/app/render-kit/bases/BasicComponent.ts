import { RzElementProps, MetaProps, RzElementType, Component, } from "../models";
import { AbstractContainer } from "../interfaces";

export abstract class BasicComponent<T extends RzElementProps = {}> {
    static defaultProps = {};
    type: RzElementType;
    container: AbstractContainer;
    children: Component[];

    constructor(public props: T & Partial<RzElementProps>, public graphic: any, public meta: MetaProps) {
        this.props = { ...BasicComponent.defaultProps, ...(props as any) };
        this.meta.engine.enhancer.assignEnhancers(this);
        this.meta.engine.event.assignEvents(this);
    }

    render() {
        return null;
    };

    updateProps(newProps: T & RzElementProps) {
        const current = this.props || {};
        const next = { ...current, ...(newProps as any) } as T;
        this.props = next;
    }

    shouldRerender(nextProps: T, nextState?: any): boolean;
    shouldRerender(nextProps: T): boolean {
        return nextProps !== this.props;
    }
}
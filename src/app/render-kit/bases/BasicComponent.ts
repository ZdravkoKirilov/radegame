import { RzElementProps, MetaProps, RzElementType, Component, } from "../models";
import { AbstractContainer } from "@app/rendering";

export abstract class BasicComponent<T extends RzElementProps = {}> {
    static defaultProps = {};
    type: RzElementType;
    container: AbstractContainer;
    children: Component[];

    constructor(public props: T, public graphic: any, public meta: MetaProps) {
        this.props = { ...BasicComponent.defaultProps, ...props };
        this.meta.engine.enhancer.assignEnhancers(this);
        this.meta.engine.event.assignEvents(this);
    }

    render() {
        return null;
    };

    updateProps(newProps: T | any) {
        const current = this.props || {};
        const next = { ...current, ...newProps } as T;
        this.props = next;
    }

    shouldUpdate(nextProps: T, nextState?: any): boolean;
    shouldUpdate(nextProps: T): boolean {
        return nextProps !== this.props;
    }
}
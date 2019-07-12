import { RzElementProps, MetaProps, RzElementType, Component, } from "../models";
import { AbstractContainer } from "../interfaces";
import { updateComponent } from "../helpers";

export class BasicComponent<T extends RzElementProps = {}> {
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

        if (this.shouldRerender(newProps)) {
            this.props = next;
            updateComponent(this, this.render());
        } else {
            this.props = next;
        }
    }

    update() {
        this.meta.engine.mutator.updateComponent(this);
        this.meta.engine.event.removeListeners(this);
        this.meta.engine.event.assignEvents(this);
    }

    remove() {
        this.meta.engine.mutator.removeComponent(this);
    }

    shouldRerender(nextProps: T): boolean {
        return nextProps !== this.props;
    }
}
import { RzElementPrimitiveProps, MetaProps, RzElementType, Component, RzSize, AbstractContainer, updateComponent } from "../internal";

export class BasicComponent<T extends RzElementPrimitiveProps = {}> {
    static defaultProps = {};
    type: RzElementType;
    container: AbstractContainer;
    children?: Component[];
    parent?: Component;

    constructor(public props: T & Partial<RzElementPrimitiveProps>, public graphic: any, public meta: MetaProps) {
        this.props = { ...BasicComponent.defaultProps, ...(props as any) };
        this.meta.engine.event.assignEvents(this);
        if (typeof this.props.ref === 'function') {
            this.props.ref(this);
        }
    }

    render() {
        return null;
    };

    updateProps(newProps: T & RzElementPrimitiveProps) {
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

        if (typeof this.props.ref === 'function') {
            this.props.ref(this);
        }
    }

    getSize(): RzSize {
        return this.meta.engine.mutator.getSize(this);
    }

    remove() {
        this.meta.engine.mutator.removeComponent(this);
    }

    shouldRerender(nextProps: T): boolean {
        return nextProps !== this.props;
    }
}
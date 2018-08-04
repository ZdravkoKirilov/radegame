import { RzElementProps, MetaProps, Component } from "../models";
import { AbstractContainer } from "../interfaces";

export class BasicComponent {
    meta: MetaProps;
    props: RzElementProps;
    graphic: any;
    container: AbstractContainer;
    children: Array<Component | null>;

    constructor(props: RzElementProps, graphic: any, meta: MetaProps) {
        this.graphic = graphic;
        this.props = props;
        this.meta = meta;
        this.meta.engine.enhancer.assignEnhancers(this);
        this.meta.engine.event.assignEvents(this);
    }

    render() {
        return this as any;
    }

    update() {
        this.meta.engine.mutator.updateComponent(this);
    }

    setProps(props: RzElementProps | any) {
        const current = this.props || {};
        const next = { ...current, ...props };

        if (this.shouldUpdate(next)) {
            this.props = next;
            this.update();
        } else {
            this.props = next;
        }
    }

    remove() {
        this.meta.engine.mutator.removeComponent(this);
    }

    shouldUpdate(nextProps: RzElementProps, nextState?: any): boolean;

    shouldUpdate(nextProps: RzElementProps): boolean {
        return true;
    }
}
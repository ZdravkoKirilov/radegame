import { RzElementProps, MetaProps, Component, RzElementType } from "../models";
import { AbstractContainer } from "../interfaces";

export class BasicComponent<T = RzElementProps & any> {
    static defaultProps?: any;
    type: RzElementType;
    meta: MetaProps;
    props: T;
    graphic: any;
    container: AbstractContainer;
    parent: Component;
    children: Array<Component | null>;
    cachedSelectors: {
        [key: string]: Component;
    }

    constructor(props: T, graphic: any, meta: MetaProps) {
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

    setProps(props: T | any) {
        const current = this.props || {};
        const next = { ...current, ...props } as T;

        if (this.shouldUpdate(next)) {
            this.props = next;
            this.update();
        } else {
            this.props = next;
        }
    }

    remove() {
        console.warn('remove was called: ');
        console.dir(this);
        this.meta.engine.mutator.removeComponent(this);
    }

    shouldUpdate(nextProps: T, nextState?: any): boolean;

    shouldUpdate(nextProps: T): boolean {
        return nextProps !== this.props;
    }
}
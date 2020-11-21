import {
    RzElementProps, RzElement, MetaProps, updateComponent,
    DidUpdatePayload, RzElementType, Component, AbstractContainer
} from "../internal";

export class StatefulComponent<P = {}, S = {}> {
    static defaultProps: Partial<RzElementProps>;
    meta: MetaProps;
    static stateful = true;
    state: S;
    props: P & Partial<RzElementProps> & { children?: RzElement };
    type: RzElementType;
    container: AbstractContainer;
    children?: Component[];
    parent?: Component;

    constructor(props: P, meta: MetaProps) {
        this.props = { ...((this.constructor as any).defaultProps || {}) as any, ...props as any };
        this.meta = meta;
        if (typeof this.props.ref === 'function') {
            this.props.ref(this);
        }
    }

    setState(state: Partial<S>, callback?: Function) {

        const current = this.state as any || {} as any;
        const next = { ...current, ...(state as any) || {} } as S;
        if (this.shouldRerender(this.props, next)) {
            this.state = next as S;
            setTimeout(() => {
                updateComponent(this, this.render() as any);
                if (callback) {
                    callback();
                }
                if (this.didUpdate) {
                    this.didUpdate({
                        prev: { state: current, props: this.props },
                        next: { state: next, props: this.props },
                    });
                }
                if (typeof this.props.ref === 'function') {
                    this.props.ref(this);
                }
            });
        } else {
            this.state = next as S;
            if (callback) {
                callback();
            }
            if (typeof this.props.ref === 'function') {
                this.props.ref(this);
            }
        }
    }

    updateProps(props: Partial<P>, callback?: Function) {
        setTimeout(() => {
            const current = this.props || {} as P;
            const next = { ...(current as any), ...(props as any) } as P;

            if (this.shouldRerender(next, this.state)) {
                if (this.willReceiveProps) {
                    this.willReceiveProps(next);
                }
                this.props = next;
                updateComponent(this, this.render() as any);
                if (callback) {
                    callback();
                }
                if (this.didUpdate) {
                    this.didUpdate({
                        prev: { state: this.state, props: current },
                        next: { state: this.state, props: next },
                    });
                }
            } else {
                this.props = next;
                if (callback) {
                    callback();
                }
            }
            if (typeof this.props.ref === 'function') {
                this.props.ref(this);
            }
        });
    }

    shouldRerender(nextProps: P, nextState: S) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render(): RzElement | null {
        return null;
    };

    willReceiveProps?(nextProps: P): void;
    willMount?(): void;
    didMount?(): void;
    willUnmount?(): void;
    didUpdate?(payload: DidUpdatePayload<P, S>): void;

    didCatch?(err: any, stack: string): void;
}
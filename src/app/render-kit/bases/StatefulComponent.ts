import { RzElementProps, RzElement, MetaProps, DidUpdatePayload, RzElementType, Component, RzElementChild } from "../models";
import { AnimationOrchestrator } from "../animations";
import { updateComponent } from "../helpers";
import { AbstractContainer } from "../interfaces";

export class StatefulComponent<P = {}, S = {}> {
    static defaultProps: Partial<RzElementProps>;
    meta: MetaProps;
    static stateful = true;
    state: S;
    props: P & Partial<RzElementProps> & { children?: RzElement };
    type: RzElementType;
    container: AbstractContainer;
    children: Component[];
    parent: Component;

    get animations(): AnimationOrchestrator[] { return (this.type as any).animations || []; }

    constructor(props: P, meta: MetaProps) {
        this.props = { ...((this.constructor as any).defaultProps || {}) as any, ...props as any };
        this.meta = meta;
    }

    setState(state: Partial<S>) {
        setTimeout(() => {
            const current = this.state as any || {} as any;
            const next = { ...current, ...(state as any) || {} } as S;
            if (this.shouldRerender(this.props, next)) {
                this.state = next as S;
                updateComponent(this, this.render());
                if ('didUpdate' in this) {
                    this.didUpdate({
                        prev: { state: current, props: this.props },
                        next: { state: next, props: this.props },
                    });
                }
            } else {
                this.state = next as S;
            }
        });
    }

    updateProps(props: Partial<P>) {
        setTimeout(() => {
            const current = this.props || {} as P;
            const next = { ...(current as any), ...(props as any) } as P;

            if (this.shouldRerender(next, this.state)) {
                if ('willReceiveProps' in this) {
                    this.willReceiveProps(next);
                }
                this.props = next;
                updateComponent(this, this.render());
                if ('didUpdate' in this) {
                    this.didUpdate({
                        prev: { state: this.state, props: current },
                        next: { state: this.state, props: next },
                    });
                }
            } else {
                this.props = next;
            }
        });
    }

    shouldRerender(nextProps: P, nextState: S) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render(): RzElement {
        return null;
    };

    willReceiveProps?(nextProps: P): void;
    willMount?(): void;
    didMount?(): void;
    willUnmount?(): void;
    didUpdate?(payload: DidUpdatePayload<P, S>): void;
}
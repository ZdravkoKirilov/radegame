import { RzElementProps, RzElement, MetaProps, DidUpdatePayload, RzElementType, Component } from "../models";
import { AnimationOrchestrator } from "../animations";
import { updateComposite } from "../helpers";
import { AbstractContainer } from "../interfaces";

export class StatefulComponent<P = {}, S = {}> {
    static defaultProps = {};
    meta: MetaProps;
    static stateful = true;
    state: S;
    props: P & Partial<RzElementProps>;
    type: RzElementType;
    container: AbstractContainer;
    children: Component[];

    get animations(): AnimationOrchestrator[] { return (this.type as any).animations || []; }

    constructor(props: P, meta: MetaProps) {
        this.props = props;
        this.meta = meta;
    }

    setState(state: Partial<S>) {
        const current = this.state as any || {} as any;
        const next = { ...current, ...(state as any) || {} } as S;
        if (this.shouldRerender(this.props, next)) {
            this.state = next as S;
            updateComposite(this.render(), this);
            if ('didUpdate' in this) {
                this.didUpdate({ state: { prev: current, next } });
            }
        } else {
            this.state = next as S;
        }
    }

    updateProps(props: Partial<P>) {
        const current = this.props || {} as P;
        const next = { ...(current as any), ...(props as any) } as P;

        if (this.shouldRerender(next, this.state)) {
            if ('willReceiveProps' in this) {
                this.willReceiveProps(next);
            }
            this.props = next;
            if ('didUpdate' in this) {
                this.didUpdate({ props: { prev: current, next } });
            }
        } else {
            this.props = next;
        }
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
import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement, MetaProps, DidUpdatePayload } from "../models";
import { AnimationOrchestrator } from "../animations";
import { updateComposite } from "../helpers";

export abstract class StatefulComponent<P = {}, S = {}> extends BasicComponent<P> {
    stateful = true;
    state: S;
    props: P & Partial<RzElementProps>;

    get animations(): AnimationOrchestrator[] { return (this.type as any).animations || []; }

    constructor(props: P, meta: MetaProps) {
        super(props, null, meta);
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

    abstract render(): RzElement;

    willReceiveProps?(nextProps: P): void;
    willMount?(): void;
    didMount?(): void;
    willUnmount?(): void;
    didUpdate?(payload: DidUpdatePayload<P, S>): void;
}
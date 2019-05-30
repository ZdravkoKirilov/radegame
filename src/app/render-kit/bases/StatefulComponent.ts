import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement, MetaProps, DidUpdatePayload } from "../models";
import { AnimationOrchestrator } from "../animations";

export abstract class StatefulComponent<P extends RzElementProps = {}, S = {}> extends BasicComponent<P> {
    static stateful = true;
    state: S;
    props: P;

    get animations(): AnimationOrchestrator[] { return (this.type as any).animations || []; }

    constructor(props: P, meta: MetaProps) {
        super(props, null, meta);
    }

    setState(state: Partial<S>) {
        const current = this.state as any || {} as any;
        const next = { ...current, ...(state as any) || {} } as S;
        if (this.shouldUpdate(this.props, next)) {
            this.state = next as S;

            if ('didUpdate' in this) {
                this.didUpdate({ state: { prev: current, next } });
            }
            this.meta.engine.mutator.updateComponent(this);
        } else {
            this.state = next as S;
        }
    }

    updateProps(props: Partial<P>) {
        const current = this.props || {} as P;
        const next = { ...current, ...props } as P;

        if (this.shouldUpdate(next, this.state)) {
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

    shouldUpdate(nextProps: P, nextState: S) {
        return nextProps !== this.props || nextState !== this.state;
    }

    abstract render(): RzElement;

    willReceiveProps?: (nextProps: P) => void;
    willMount?: () => void;
    didMount?: () => void;
    willUnmount?: () => void;
    didUpdate?: (payload: DidUpdatePayload<P, S>) => void;
}
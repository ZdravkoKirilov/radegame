import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement, MetaProps, Lifecycles } from "../models";
import { AnimationGroup } from "../animations";

export class StatefulComponent<P extends object = {}, S extends object = {}> extends BasicComponent<P> {
    static stateful = true;
    static defaultProps: any;

    state: S;
    props: P & RzElementProps;

    animations: AnimationGroup[] = [];

    constructor(props: P, meta: MetaProps) {
        super(props, null, meta);
    }

    setState(state: S) {
        const current = this.state || {};
        const next = { ...current, ...state || {} } as S;
        if (this.shouldUpdate(this.props, next)) {
            this.state = next as S;
            this.update();

            if ('didUpdate' in this) {
                (this as Lifecycles).didUpdate({ state: { prev: current, next } });
            }
        } else {
            this.state = next as S;
        }
    }

    setProps(props: P | any) {
        const current = this.props || {};
        const next = { ...current, ...props };

        if (this.shouldUpdate(next, this.state)) {
            if ('willReceiveProps' in this) {
                (this as Lifecycles).willReceiveProps(next);
            }
            this.props = next as P;
            this.update();

            if ('didUpdate' in this) {
                (this as Lifecycles).didUpdate({ props: { prev: current, next } });
            }
        } else {
            this.props = next as P;
        }
    }

    shouldUpdate(nextProps: P & RzElementProps, nextState: S) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render(): RzElement {
        throw new Error('Render not implemented!');
    }
}
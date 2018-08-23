import { BasicComponent } from "./BasicComponent";
import { RzElementProps, RzElement, MetaProps, Lifecycles } from "../models";

export class StatefulComponent<P, S> extends BasicComponent {
    static stateful = true;
    static defaultProps: any;
    state: S;
    props: P & RzElementProps;

    constructor(props: P, meta: MetaProps) {
        super(props, null, meta);
    }

    setState(state: S) {
        const current = this.state || {};
        const next = { ...current, ...state || {} };
        if (this.shouldUpdate(this.props, state)) {
            this.state = next as S;
            this.update();
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
        } else {
            this.props = next as P;
        }
    }

    shouldUpdate(nextProps: P & RzElementProps, nextState: S) {
        return true;
    }

    render(): RzElement {
        throw new Error('Render not implemented!');
    }
}
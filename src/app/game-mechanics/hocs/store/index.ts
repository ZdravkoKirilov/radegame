import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

import { AppState } from "@app/core";
import { StatefulComponent, createElement, RzElementType, MetaProps } from "@app/render-kit";

export type StoreProviderProps = {
    store: Store<AppState>;
};

export class StoreProvider extends StatefulComponent<StoreProviderProps> {
    constructor(props: StoreProviderProps, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
    }
    render() {
        return this.props.children;
    }
}

export const withStore = <T>(component: RzElementType<T>) => {
    return class WithStore extends StatefulComponent<T & { store?: Store<AppState> }> {
        render() {
            return createElement(
                component,
                {
                    store: this.meta.context.get('store'),
                    ...this.props
                },
                [...(this.props.children || []) as any]
            );
        }
    };
};

type MapStateToProps<T> = (storeState: AppState, componentProps: T) => any;

export const connect = <OwnProps = any, StoreProps = any>(mapStateToProps: MapStateToProps<OwnProps>) =>
    (component: RzElementType<OwnProps>) => {
        type State = { fromStore?: AppState };
        type Props = OwnProps & Partial<StoreProps>;
        return class WithStore extends StatefulComponent<Props, State> {
            private sub: Subscription;
            state = {} as State;

            didMount() {
                const store = this.meta.context.get('store') as Store<AppState>;
                this.sub = store.pipe(filter<AppState>(Boolean), map(state => this.setState({ fromStore: state }))).subscribe();
            }
            willUnmount() {
                this.sub.unsubscribe();
            }
            render() {
                const computedProps: StoreProps = this.state.fromStore ? mapStateToProps(this.state.fromStore, this.props) : null;
                return computedProps ? createElement(
                    component,
                    {
                        store: this.meta.context.get('store'),
                        ...computedProps,
                        ...this.props
                    },
                    [...(this.props.children || []) as any]
                ) : null;
            }
        };
    };

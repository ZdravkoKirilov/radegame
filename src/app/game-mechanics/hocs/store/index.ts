import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

import { AppState } from "@app/core";
import { StatefulComponent, createElement, RzElementType } from "@app/render-kit";

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
        type Props = OwnProps & { store?: Store<AppState> } & StoreProps;
        type State = { fromStore: AppState };
        return class WithStore extends StatefulComponent<Props, State> {
            private sub: Subscription;

            didMount() {
                const store = this.meta.context.get('store') as Store<AppState>;
                this.sub = store.pipe(filter<AppState>(Boolean), map(state => this.setState({ fromStore: state }))).subscribe();
            }
            willUnmount() {
                this.sub.unsubscribe();
            }
            render() {
                const computedProps: StoreProps = this.state.fromStore ? mapStateToProps(this.state.fromStore, this.props) : {};

                return createElement(
                    component,
                    {
                        store: this.meta.context.get('store'),
                        ...computedProps,
                        ...this.props
                    },
                    [...(this.props.children || []) as any]
                );
            }
        };
    };

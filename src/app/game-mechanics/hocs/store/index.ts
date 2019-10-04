import { Store } from "@ngrx/store";

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
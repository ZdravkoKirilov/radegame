import { StatefulComponent, createElement, RzElementType } from "@app/render-kit";
import { GameBroadcastService } from "../../services/game-broadcast/game-broadcast.service";

export type InjectedDispatcher = {
    dispatcher?: GameBroadcastService;
};

export const injectDispatcher = <T>(component: RzElementType<T>) => {
    return class WithDispatcher extends StatefulComponent<T & InjectedDispatcher> {
        render() {
            return createElement(
                component,
                {
                    dispatcher: this.meta.context.get('dispatcher'),
                    ...this.props
                },
                [...(this.props.children || []) as any]
            );
        }
    };
};
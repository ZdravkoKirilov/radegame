import { StatefulComponent, createElement, RzElementType } from "@app/render-kit";
import { GameBroadcastService } from "../../services/game-broadcast/game-broadcast.service";

export const withDispatcher = <T>(component: RzElementType<T>) => {
    return class WithDispatcher extends StatefulComponent<T & { dispatcher?: GameBroadcastService }> {
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
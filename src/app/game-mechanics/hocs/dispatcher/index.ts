import { StatefulComponent, createElement, RzElementType } from "@app/render-kit";
import { GameBroadcastService } from "../../services";

export const withDispatcher = <T>(component: RzElementType<T>) => {
    return class WithDispatcher extends StatefulComponent<T & { dispatcher?: GameBroadcastService }> {
        render() {
            return createElement(component, {
                dispatcher: this.meta.context.get('dispatcher'),
                ...this.props
            });
        }
    };
};
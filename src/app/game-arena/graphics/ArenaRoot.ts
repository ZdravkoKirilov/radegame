import { Store } from "@ngrx/store";

import { StatefulComponent, createElement, MetaProps } from "@app/render-kit";
import { AppState } from "@app/core";
import { Module, ModuleRenderer, ModuleRendererProps } from "@app/game-mechanics";

import { selectCommonGameStore } from "../state";

export type GameArenaRootProps = {
    store: Store<AppState>;
    module: Module;
}
export class GameArenaRoot extends StatefulComponent<GameArenaRootProps> {
    constructor(props: GameArenaRootProps, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
        this.meta.context.set('selectCommonGameStore', selectCommonGameStore);
    }

    didMount() {
        (window as any).rootComp = this;
    }

    render() {
        const { module } = this.props;

        return createElement<ModuleRendererProps>(
            ModuleRenderer,
            { module },
        );
    }
}
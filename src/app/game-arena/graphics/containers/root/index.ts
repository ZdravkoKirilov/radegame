import { Store } from "@ngrx/store";

import { StatefulComponent, createElement, MetaProps } from "@app/render-kit";
import { AppState } from "@app/core";
import { MainStage } from "../main-stage";
import { GameBroadcastService } from "../../../services/game-broadcast/game-broadcast.service";
import { HomeMadeEventEmitter } from "@app/shared";

type Props = {
    store: Store<AppState>;
    dispatcher: GameBroadcastService;
}
export class GameArenaRoot extends StatefulComponent<Props> {
    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
        this.meta.context.set('dispatcher', this.props.dispatcher);
    }

    didMount() {
        (window as any).rootComp = this;
    }

    render() {
        return createElement(MainStage);
    }
}
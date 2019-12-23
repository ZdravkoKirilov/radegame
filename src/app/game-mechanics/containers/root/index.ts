import { Store } from "@ngrx/store";

import { StatefulComponent, createElement, MetaProps, Suspense, SuspenseProps } from "@app/render-kit";
import { AppState } from "@app/core";
import { MainStage } from "../main-stage";
import { GameBroadcastService } from "../../services/game-broadcast/game-broadcast.service";
import { DataLoader, DataLoaderProps } from "../data-loader";

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
        return createElement<SuspenseProps>(
            Suspense,
            {
                fallback: createElement('text', {
                    value: 'Loading...',
                    styles: {
                        x: 50, y: 50,
                    },
                    textStyle: {
                        fill: ['#333231'], stroke: '#333231'
                    }
                })
            },
            createElement<DataLoaderProps>(
                DataLoader,
                {
                    round: null
                },
                createElement(MainStage)
            ),
        );
    }
}
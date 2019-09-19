import { Store } from "@ngrx/store";

import { StatefulComponent, createElement, MetaProps } from "@app/render-kit";
import { AppState } from "@app/core";
import { GameText } from "../text";
import { ListenersOrchestrator } from "../../listeners";

type Props = {
    store: Store<AppState>
}
export class GameArenaRoot extends StatefulComponent<Props> {
    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
    }

    render() {
        return createElement('fragment', null,
            createElement(ListenersOrchestrator),
            createElement(GameText),
        );
    }
}
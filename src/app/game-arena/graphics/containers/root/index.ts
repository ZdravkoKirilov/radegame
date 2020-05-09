import { Store } from "@ngrx/store";

import { StatefulComponent, createElement, MetaProps } from "@app/render-kit";
import { AppState } from "@app/core";

import { MainWidget } from "../main-widget";
import { selectCommonGameStore } from "../../../state";

type Props = {
    store: Store<AppState>;
}
export class GameArenaRoot extends StatefulComponent<Props> {
    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
        this.meta.context.set('selectCommonGameStore', selectCommonGameStore);
    }

    didMount() {
        (window as any).rootComp = this;
    }

    render() {
        return createElement(MainWidget);
    }
}
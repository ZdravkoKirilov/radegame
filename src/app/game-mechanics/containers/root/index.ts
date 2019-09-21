import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";

import { StatefulComponent, createElement, MetaProps, AutoClean } from "@app/render-kit";
import { AppState } from "@app/core";
import { ListenersOrchestrator } from "../../listeners";
import { MainStage } from "../main-stage";
import { GameState } from "../../models";
import { selectGameState } from "@app/game-arena";
import { map } from "rxjs/operators";

type Props = {
    store: Store<AppState>
}

type State = {
    gameState?: GameState;
}
@AutoClean()
export class GameArenaRoot extends StatefulComponent<Props, State> {
    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
    }
    state = {} as State;

    gameState$: Subscription;

    didMount() {
        this.gameState$ = this.props.store.pipe(select(selectGameState), map(state => this.setState({ gameState: state }))).subscribe();
    }

    render() {
        return this.state.gameState ? createElement('fragment', null,
            createElement(ListenersOrchestrator),
            createElement(MainStage),
        ) : null;
    }
}
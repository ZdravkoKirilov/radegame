import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { StatefulComponent, createElement, MetaProps, AutoClean } from "@app/render-kit";
import { AppState } from "@app/core";
import { MainStage } from "../main-stage";
import { GameState } from "../../models";
import { selectGameState } from "@app/game-arena";
import { GameBroadcastService } from "../../services/game-broadcast/game-broadcast.service";

type Props = {
    store: Store<AppState>;
    dispatcher: GameBroadcastService;
}

type State = {
    gameState?: GameState;
}
@AutoClean()
export class GameArenaRoot extends StatefulComponent<Props, State> {
    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
        this.meta.context.set('dispatcher', this.props.dispatcher);
    }
    state = {} as State;

    gameState$: Subscription;

    didMount() {
        this.gameState$ = this.props.store.pipe(select(selectGameState), map(state => this.setState({ gameState: state }))).subscribe();
        (window as any).rootComp = this;
    }

    render() {
        return this.state.gameState ? createElement(MainStage) : null;
    }
}
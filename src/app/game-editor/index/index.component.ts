import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from '../../core/state/index';
import {GameBoards} from '../../game-mechanics/configs/game-boards';
import {Abilities} from '../../game-mechanics/configs/abilities';
import {Movements} from '../../game-mechanics/configs/movements';
import {UpdateEditorAssetsAction} from '../state/actions/byFeature/assetActions';
import {selectRouterParam} from '../../core/state/reducers/selectors';
import {selectGame} from '../state/reducers/selectors';
import {Game} from '../../game-mechanics/models/index';
import {ROUTER_PARAMS} from '../../shared/config/config';

@Component({
    selector: 'rg-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
    private gameBoards = GameBoards;
    private boardType: string;
    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            const gameName = selectRouterParam(ROUTER_PARAMS.GAME_NAME)(state);
            const game: Game = selectGame(gameName)(state);
            if (game && game.boardType !== this.boardType) {
                this.store.dispatch(new UpdateEditorAssetsAction({
                    supportedMovements: this.gameBoards[game.boardType].allowedMovements,
                    supportedAbilities: this.gameBoards[game.boardType].supportedAbilities,
                    abilities: Abilities,
                    gameBoards: GameBoards,
                    movements: Movements
                }));
                this.boardType = game.boardType;
            }
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}

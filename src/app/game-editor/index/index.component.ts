import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../core/state/index';
import { GameBoards } from '../../game-mechanics/configs/game-boards';
import { Abilities } from '../../game-mechanics/configs/abilities';
import { Movements } from '../../game-mechanics/configs/movements';
import { UpdateEditorAssetsAction } from '../state/actions/byFeature/assetActions';
import { ClearFormAction } from '../state/actions/byFeature/formActions';
import { selectRouterData } from '../../core/state/reducers/selectors';
import { Game } from '../../game-mechanics/models/index';

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
        this.store.dispatch(new ClearFormAction());
        this.storeSub = this.store
            .select('router')
            .subscribe(state => {
                const game: Game = selectRouterData('game', state).game;
                if (game && game.boardType !== this.boardType) {
                    this.store.dispatch(new UpdateEditorAssetsAction({
                        supportedMovements: this.gameBoards[game.boardType].allowedMovements,
                        supportedAbilities: this.gameBoards[game.boardType].supportedAbilities,
                        abilities: Abilities,
                        gameBoards: GameBoards,
                        movements: Movements,
                        game
                    }));
                    this.boardType = game.boardType;
                }
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}

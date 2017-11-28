import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { UpdateEditorAssetsAction } from '../../state/actions/byFeature/assetActions';
import { ClearFormAction } from '../../state/actions/byFeature/formActions';
import { selectRouterData } from '../../../core/state/reducers/selectors';
import { Game } from '../../../game-mechanics/models/index';
import { GameData } from '../../../game-mechanics/models/index';

@Component({
    selector: 'rg-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
    private boardType: string;
    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new ClearFormAction());
        this.storeSub = this.store
            .subscribe(state => {
                const gameData: GameData = selectRouterData('game')(state);
                if (gameData) {
                    const game: Game = gameData.game;
                    if (game && game.boardType !== this.boardType) {
                        this.store.dispatch(new UpdateEditorAssetsAction({
                            supportedMovements: gameData.supportedMovements,
                            supportedActions: gameData.supportedActions,
                            actions: gameData.actions,
                            movements: gameData.movements,
                            game
                        }));
                        this.boardType = game.boardType;
                    }
                }
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}

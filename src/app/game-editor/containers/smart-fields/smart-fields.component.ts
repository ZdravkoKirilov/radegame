import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { selectBoardType } from '../../state/reducers/byFeature/assets.reducer';
import { selectRouterData } from '../../../core/state/reducers/selectors';
import { Game, GameData } from '../../../game-mechanics/models/index';
import { SetFieldsAction } from '../../state/actions/byFeature/field.action';
import {
    SetMapLocationsAction,
    GetMapSuccessAction,
    SetMapPathsAction
} from '../../state/actions/byFeature/map.action';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss']
})
export class SmartFieldsComponent implements OnInit, OnDestroy {

    boardType: string;
    game: Game;
    storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.storeSub = this.store
            .subscribe(state => {
                this.boardType = selectBoardType(state);
                const gameData: GameData = selectRouterData('game')(state);
                if (!this.game) {
                    this.store.dispatch(new SetFieldsAction(gameData.fields));
                    this.store.dispatch(new SetMapLocationsAction(gameData.locations));
                    this.store.dispatch(new SetMapPathsAction(gameData.paths));
                    this.store.dispatch(new GetMapSuccessAction(gameData.map));
                    this.game = gameData.game;
                }
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

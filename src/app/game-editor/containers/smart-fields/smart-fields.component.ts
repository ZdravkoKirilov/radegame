import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from '../../../core/state/index';
import {selectBoardType} from '../../state/reducers/selectors';
import {selectRouterData} from '../../../core/state/reducers/selectors';
import {Game} from '../../../game-mechanics/models/index';
import { GameData } from '../../../shared/models/GameData';
import {GetFieldsSuccessAction} from '../../state/actions/byFeature/fieldActions';
import {
    GetMapLocationsSuccessAction,
    GetMapPathsSuccessAction,
    GetMapSuccessAction,

} from '../../state/actions/byFeature/mapActions';

@Component({
    selector: 'rg-smart-fields',
    templateUrl: './smart-fields.component.html',
    styleUrls: ['./smart-fields.component.scss']
})
export class SmartFieldsComponent implements OnInit, OnDestroy {

    boardType: Observable<string>;
    game: Game;
    storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.boardType = this.store.map(state => selectBoardType(state));
        this.storeSub = this.store.select('router')
            .subscribe(state => {
                const gameData: GameData = selectRouterData('game', state);
                if (!this.game) {
                    this.store.dispatch(new GetFieldsSuccessAction(gameData.fields));
                    this.store.dispatch(new GetMapLocationsSuccessAction(gameData.locations));
                    this.store.dispatch(new GetMapPathsSuccessAction(gameData.paths));
                    this.store.dispatch(new GetMapSuccessAction(gameData.map));
                    this.game = gameData.game;
                }
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

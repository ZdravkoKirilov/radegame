import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from '../../../core/state/index';
import {selectBoardType} from '../../state/reducers/selectors';
import {selectRouterData} from '../../../core/state/reducers/selectors';
import {Game} from '../../../game-mechanics/models/index';
import {GetFieldsAction} from '../../state/actions/byFeature/fieldActions';
import {GetMapLocationsAction, GetMapPathsAction, GetMapAction} from '../../state/actions/byFeature/mapActions';

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
                const game: Game = selectRouterData('game', state);
                if (!this.game) {
                    const payload = {gameId: game.id};
                    this.store.dispatch(new GetFieldsAction(payload));
                    this.store.dispatch(new GetMapLocationsAction(payload));
                    this.store.dispatch(new GetMapPathsAction(payload));
                    this.store.dispatch(new GetMapAction(payload));
                    this.game = game;
                }
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

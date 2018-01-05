import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { selectBoardType, selectGame } from '../../state/reducers/byFeature/assets.reducer';
import { selectRouterData } from '../../../core/state/reducers/selectors';
import { Game, GameData } from '../../../game-mechanics/models/index';

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
                this.game = selectGame(state);
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

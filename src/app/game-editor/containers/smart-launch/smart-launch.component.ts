import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/state/index';
import { GameBoards } from '../../../game-mechanics/configs/game-boards';
import { GameBoard, Game } from '../../../game-mechanics/models/index';
import { BaseControl } from '../../../dynamic-forms/models/Base';
import { Option } from '../../../dynamic-forms/models/Base';
import { GAME_LAUNCH_DEF } from '../../utils/form-definitions';
import { CreateGameAction, SetGamesAction } from '../../state/actions/byFeature/launcher.action';
import { selectRouterData } from '../../../core/state/reducers/selectors';
import { selectGames } from '../../state/reducers/byFeature/games.reducer';

@Component({
    selector: 'rg-smart-launch',
    templateUrl: './smart-launch.component.html',
    styleUrls: ['./smart-launch.component.scss']
})
export class SmartLaunchComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    controls: BaseControl[] = [];
    games: Game[];

    constructor(private store: Store<AppState>) {
    }

    handleGameCreate(game: Game) {
        this.store.dispatch(new CreateGameAction(game));
    }

    ngOnInit() {

        this.storeSub = this.store.subscribe((state: AppState) => {
            const boardTypes: Option[] = Object
                .values(GameBoards)
                .map((elem: GameBoard) => ({label: elem.displayName, value: elem.id}));
            this.controls = GAME_LAUNCH_DEF(boardTypes);

            if (!this.games) {
                const games = selectRouterData('games')(state);
                this.store.dispatch(new SetGamesAction(games));
                this.games = Object.values(games);
            }
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

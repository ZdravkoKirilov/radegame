import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/state/index';
import { GameBoards } from '../../../game-mechanics/configs/game-boards';
import { GameBoard, Game } from '../../../game-mechanics/models';
import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { Option } from '../../../dynamic-forms/models/Base.model';
import { GAME_LAUNCH_DEF } from '../../forms/Launcher/launcher.form';
import { CreateGameAction } from '../../state/actions/byFeature/launcher.action';
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
            this.controls = GAME_LAUNCH_DEF(GameBoards);
            this.games = selectGames(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}

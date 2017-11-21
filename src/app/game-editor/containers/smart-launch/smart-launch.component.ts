import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Store} from '@ngrx/store';

import {AppState} from '../../../core/state/index';
import {GameBoards} from '../../../game-mechanics/configs/game-boards';
import {GameBoard, Game} from '../../../game-mechanics/models/index';
import {BaseControl} from '../../../dynamic-forms/models/Base';
import {Option} from '../../../dynamic-forms/models/Base';
import {GAME_LAUNCH_DEF} from '../../utils/form-definitions';
import {CreateGameAction} from '../../state/actions/byFeature/launcherActions';
import {selectGames} from '../../state/reducers/selectors';
import {GetGamesAction} from '../../state/actions/byFeature/launcherActions';

@Component({
    selector: 'rg-smart-launch',
    templateUrl: './smart-launch.component.html',
    styleUrls: ['./smart-launch.component.scss']
})
export class SmartLaunchComponent implements OnInit {

    controls: Observable<BaseControl<any>[]> = of([]);
    games: Observable<Game[]>;

    constructor(private store: Store<AppState>) {
    }

    handleGameCreate(game: Game) {
        this.store.dispatch(new CreateGameAction(game));
    }

    ngOnInit() {
        this.store.dispatch(new GetGamesAction());
        setTimeout(() => {
            const boardTypes: Option[] = Object
                .values(GameBoards)
                .map((elem: GameBoard) => ({label: elem.displayName, value: elem.id}));
            this.controls = of(GAME_LAUNCH_DEF(boardTypes));
            this.games = this.store.map(state => selectGames(state));
        });
    }

}

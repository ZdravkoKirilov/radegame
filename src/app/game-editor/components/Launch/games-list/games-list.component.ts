import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Game} from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent {
    @Input() items: Game[];

    constructor(private router: Router) {
    }

    navigateToGame(gameId: number) {
        this.router.navigateByUrl(`games/editor/${gameId}`);
    }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Game } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: ['./games-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent extends ListBase<Game> {
}

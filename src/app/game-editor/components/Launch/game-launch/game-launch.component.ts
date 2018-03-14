import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Game } from '../../../../game-mechanics';
import { IndexBase } from '../../../mixins';

@Component({
    selector: 'rg-game-launch',
    templateUrl: './game-launch.component.html',
    styleUrls: ['./game-launch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLaunchComponent extends IndexBase<Game> {

}

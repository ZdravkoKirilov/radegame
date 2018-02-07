import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Trivia } from '../../../../game-mechanics/models/index';
import { IndexBase } from '../../mixins/index.base';

@Component({
    selector: 'rg-trivia',
    templateUrl: './trivia.component.html',
    styleUrls: ['./trivia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaComponent extends IndexBase<Trivia> {

}

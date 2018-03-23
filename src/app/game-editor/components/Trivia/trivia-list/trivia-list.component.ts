import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Trivia } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-trivia-list',
    templateUrl: './trivia-list.component.html',
    styleUrls: ['./trivia-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaListComponent extends ListBase<Trivia> {
}

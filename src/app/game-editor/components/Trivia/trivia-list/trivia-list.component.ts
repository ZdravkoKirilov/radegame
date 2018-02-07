import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Trivia } from '../../../../game-mechanics/models/index';
import { ListBase } from '../../mixins/list.base';

@Component({
    selector: 'rg-trivia-list',
    templateUrl: './trivia-list.component.html',
    styleUrls: ['./trivia-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaListComponent extends ListBase<Trivia> {
}

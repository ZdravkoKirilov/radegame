import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Round } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-rounds-list',
    templateUrl: './rounds-list.component.html',
    styleUrls: ['./rounds-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundsListComponent extends ListBase<Round> {
}

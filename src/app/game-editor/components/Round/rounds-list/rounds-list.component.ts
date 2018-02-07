import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Round } from '../../../../game-mechanics/models/index';
import { ListBase } from '../../mixins/list.base';

@Component({
    selector: 'rg-rounds-list',
    templateUrl: './rounds-list.component.html',
    styleUrls: ['./rounds-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundsListComponent extends ListBase<Round> {
}

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Round } from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-rounds-list',
    templateUrl: './rounds-list.component.html',
    styleUrls: ['./rounds-list.component.scss']
})
export class RoundsListComponent {

    @Input() items: Round[];

    @Output() editItem: EventEmitter<Round> = new EventEmitter();
    @Output() removeItem: EventEmitter<Round> = new EventEmitter();

    constructor() {
    }

}

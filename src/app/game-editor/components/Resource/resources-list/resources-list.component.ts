import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Resource} from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent {
    @Input() items: Resource[];
    @Output() removeItem: EventEmitter<Resource> = new EventEmitter();

    constructor() {
    }

}

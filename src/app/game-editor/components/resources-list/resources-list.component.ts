import {Component, Input, EventEmitter} from '@angular/core';

import {Resource} from '../../../game-mechanics/models/Resource';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'rg-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent {
    @Input() items: Resource[];

    constructor() {
    }

}

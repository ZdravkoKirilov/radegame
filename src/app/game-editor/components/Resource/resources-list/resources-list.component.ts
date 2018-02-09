import { Component } from '@angular/core';

import { Resource } from '../../../../game-mechanics/models/index';
import { ListBase } from '../../../mixins/list.base';

@Component({
    selector: 'rg-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent extends ListBase<Resource> {

}

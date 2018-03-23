import { Component } from '@angular/core';

import { Resource } from '../../../../game-mechanics';
import { ListBase } from '../../../mixins';

@Component({
    selector: 'rg-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent extends ListBase<Resource> {

}

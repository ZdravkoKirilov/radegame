import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Resource } from '../../../../game-mechanics/models/index';
import { IndexBase } from '../../mixins/index.base';

@Component({
    selector: 'rg-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent extends IndexBase<Resource> {
}

import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';

import { Resource } from '../../../../game-mechanics';
import { IndexBase } from '../../../mixins';

@Component({
    selector: 'rg-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent extends IndexBase<Resource> {
    @ViewChild('template') template: TemplateRef<any>;
}

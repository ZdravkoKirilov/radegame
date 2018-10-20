import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { RESOURCE_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-resources-container',
    templateUrl: './resources.container.html',
    styleUrls: ['./resources.container.scss']
})
export class ResourcesContainerComponent extends SmartBase {

    formDefinition: FormDefinition = RESOURCE_DEF;
    readonly key: FormKey = formKeys.RESOURCES;

    constructor(public store: Store<AppState>) {
        super(store);
    }

}

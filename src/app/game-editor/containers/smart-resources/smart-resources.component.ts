import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core';
import { FormDefinition } from '../../../dynamic-forms';
import { RESOURCE_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

@Component({
    selector: 'rg-smart-resources',
    templateUrl: './smart-resources.component.html',
    styleUrls: ['./smart-resources.component.scss']
})
export class SmartResourcesComponent extends SmartBase {


    formDefinition: FormDefinition = RESOURCE_DEF;
    readonly key: FormKey = formKeys.RESOURCES;

    constructor(public store: Store<AppState>) {
        super(store);
    }

}

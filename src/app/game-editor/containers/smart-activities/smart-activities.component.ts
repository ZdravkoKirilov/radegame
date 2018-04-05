import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { ACTIVITY_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

@Component({
    selector: 'rg-smart-activities',
    templateUrl: './smart-activities.component.html',
    styleUrls: ['./smart-activities.component.scss']
})
export class SmartActivitiesComponent extends SmartBase {


    formDefinition: FormDefinition = ACTIVITY_DEF;
    key: FormKey = formKeys.ACTIVITIES;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

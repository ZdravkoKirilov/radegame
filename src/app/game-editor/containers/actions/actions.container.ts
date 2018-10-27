import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeActivityForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-actions-container',
    templateUrl: './actions.container.html',
    styleUrls: ['./actions.container.scss']
})
export class ActionsContainerComponent extends SmartBase {


    formDefinition: FormDefinition = composeActivityForm;
    key: FormKey = formKeys.ACTIONS;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}
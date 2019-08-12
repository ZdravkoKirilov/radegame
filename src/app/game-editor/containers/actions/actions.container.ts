import { Component, HostBinding } from '@angular/core';
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

    @HostBinding('class.block') hostClass = true;

    formDefinition: FormDefinition = composeActivityForm;
    key: FormKey = formKeys.actions ;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

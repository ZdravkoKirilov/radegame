import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeActivityForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';


@Component({
    selector: 'rg-actions-container',
    templateUrl: './actions.container.html',
    styleUrls: ['./actions.container.scss']
})
export class ActionsContainerComponent extends SmartBase {

    @HostBinding('class.block') hostClass = true;

    formDefinition: FormDefinition = composeActivityForm;
    key: AllEntity = ALL_ENTITIES.actions ;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

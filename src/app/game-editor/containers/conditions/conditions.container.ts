import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeConditionForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';


@Component({
    selector: 'rg-conditions-container',
    templateUrl: './conditions.container.html',
    styleUrls: ['./conditions.container.scss']
})
export class ConditionsContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeConditionForm;
    public readonly key: AllEntity = ALL_ENTITIES.conditions ;

    constructor(public store: Store<AppState> ) {
        super(store);
    }
}

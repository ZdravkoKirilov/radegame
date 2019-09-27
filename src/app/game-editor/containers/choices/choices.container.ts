import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeChoiceForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';


@Component({
    selector: 'rg-choices-container',
    templateUrl: './choices.container.html',
    styleUrls: ['./choices.container.scss']
})
export class ChoicesContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeChoiceForm;
    public readonly key: AllEntity = ALL_ENTITIES.choices;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

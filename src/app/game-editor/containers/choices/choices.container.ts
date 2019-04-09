import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeChoiceForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-choices-container',
    templateUrl: './choices.container.html',
    styleUrls: ['./choices.container.scss']
})
export class ChoicesContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeChoiceForm;
    public readonly key: FormKey = formKeys.choices as FormKey;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

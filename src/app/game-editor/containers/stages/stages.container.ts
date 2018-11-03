import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeStageForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-stages-container',
    templateUrl: './stages.container.html',
    styleUrls: ['./stages.container.scss']
})
export class StagesContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeStageForm;
    public readonly key: FormKey = formKeys.STAGES;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

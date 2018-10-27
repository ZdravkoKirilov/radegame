import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { QUEST_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-conditions-container',
    templateUrl: './conditions.container.html',
    styleUrls: ['./conditions.container.scss']
})
export class ConditionsContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = QUEST_DEF;
    public readonly key: FormKey = formKeys.CONDITIONS;

    constructor(public store: Store<AppState> ) {
        super(store);
    }
}
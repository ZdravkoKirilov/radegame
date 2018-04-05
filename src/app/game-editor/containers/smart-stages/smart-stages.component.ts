import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { STAGE_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

@Component({
    selector: 'rg-smart-stages',
    templateUrl: './smart-stages.component.html',
    styleUrls: ['./smart-stages.component.scss']
})
export class SmartStagesComponent extends SmartBase {

    public formDefinition: FormDefinition = STAGE_DEF;
    public readonly key: FormKey = formKeys.STAGES;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

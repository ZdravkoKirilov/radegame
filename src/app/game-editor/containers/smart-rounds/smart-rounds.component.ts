import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core';
import { FormDefinition } from '../../../dynamic-forms';
import { ROUND_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

@Component({
    selector: 'rg-smart-rounds',
    templateUrl: './smart-rounds.component.html',
    styleUrls: ['./smart-rounds.component.scss']
})
export class SmartRoundsComponent extends SmartBase {

    public formDefinition: FormDefinition = ROUND_DEF;
    public readonly key: FormKey = formKeys.ROUNDS;


    constructor(public store: Store<AppState>) {
        super(store);
    }
}

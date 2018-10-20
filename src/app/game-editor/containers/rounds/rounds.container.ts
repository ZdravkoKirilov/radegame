import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { ROUND_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-rounds-container',
    templateUrl: './rounds.container.html',
    styleUrls: ['./rounds.container.scss']
})
export class RoundsContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = ROUND_DEF;
    public readonly key: FormKey = formKeys.ROUNDS;


    constructor(public store: Store<AppState>) {
        super(store);
    }
}

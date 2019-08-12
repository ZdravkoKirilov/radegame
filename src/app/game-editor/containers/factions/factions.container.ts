import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeFactionForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state';

@Component({
    selector: 'rg-factions-container',
    templateUrl: './factions.container.html',
    styleUrls: ['./factions.container.scss']
})
export class FactionsContainerComponent extends SmartBase {

    formDefinition: FormDefinition = composeFactionForm;
    readonly key: FormKey = formKeys.factions ;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

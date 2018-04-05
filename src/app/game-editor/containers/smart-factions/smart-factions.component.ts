import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { FACTION_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

@Component({
    selector: 'rg-smart-factions',
    templateUrl: './smart-factions.component.html',
    styleUrls: ['./smart-factions.component.scss']
})
export class SmartFactionsComponent extends SmartBase {

    formDefinition: FormDefinition = FACTION_DEF;
    readonly key: FormKey = formKeys.FACTIONS

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

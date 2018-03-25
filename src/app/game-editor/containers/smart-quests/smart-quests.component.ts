import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core';
import { FormDefinition } from '../../../dynamic-forms';
import { QUEST_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

@Component({
    selector: 'rg-smart-quests',
    templateUrl: './smart-quests.component.html',
    styleUrls: ['./smart-quests.component.scss']
})
export class SmartQuestsComponent extends SmartBase {

    public formDefinition: FormDefinition = QUEST_DEF;
    public readonly key: FormKey = formKeys.QUESTS;

    constructor(public store: Store<AppState> ) {
        super(store);
    }
}

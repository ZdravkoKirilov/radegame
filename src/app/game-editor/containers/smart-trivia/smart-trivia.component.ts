import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core';
import { FormDefinition } from '../../../dynamic-forms';
import { TRIVIA_DEF } from '../../forms';
import { SmartBase } from '../../mixins';
import { formKeys, FormKey } from '../../state/actions/generics';

import {
    SaveTriviaAction,
    DeleteTriviaAction,
    ToggleTriviaEditorAction,
    ChangeSelectedTriviaAction,
} from '../../state/actions/byFeature/trivia.action';

@Component({
    selector: 'rg-smart-trivia',
    templateUrl: './smart-trivia.component.html',
    styleUrls: ['./smart-trivia.component.scss']
})
export class SmartTriviaComponent extends SmartBase {

    public formDefinition: FormDefinition = TRIVIA_DEF;
    public readonly key: FormKey = formKeys.TRIVIA;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}

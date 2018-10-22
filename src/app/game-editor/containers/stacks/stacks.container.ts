import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormDefinition } from '@app/dynamic-forms';
import { formKeys, FormKey } from '../../state';
import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { composeStackForm } from '../../forms';

@Component({
  selector: 'rg-stacks-container',
  templateUrl: './stacks.container.html',
  styleUrls: ['./stacks.container.scss']
})
export class StackContainerComponent extends SmartBase {

  formDefinition: FormDefinition = composeStackForm;
  key: FormKey = formKeys.POOLS;

  constructor(public store: Store<AppState>) {
    super(store);
  }

}

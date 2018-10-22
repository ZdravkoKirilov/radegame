import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormDefinition } from '@app/dynamic-forms';
import { formKeys, FormKey } from '../../state';
import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { composePoolForm } from '../../forms';

@Component({
  selector: 'rg-pools-container',
  templateUrl: './pools.container.html',
  styleUrls: ['./pools.container.scss']
})
export class PoolsContainerComponent extends SmartBase {

  formDefinition: FormDefinition = composePoolForm;
  key: FormKey = formKeys.POOLS;

  constructor(public store: Store<AppState>) {
    super(store);
  }

}

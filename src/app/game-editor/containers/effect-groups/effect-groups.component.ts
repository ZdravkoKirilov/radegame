import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormDefinition } from '@app/dynamic-forms';
import { formKeys, FormKey } from '../../state';
import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { composeEffectGroupForm } from '../../forms';

@Component({
  selector: 'rg-effect-groups',
  templateUrl: './effect-groups.component.html',
  styleUrls: ['./effect-groups.component.scss']
})
export class EffectGroupsComponent extends SmartBase {

  formDefinition: FormDefinition = composeEffectGroupForm;
  key: FormKey = formKeys.EFFECT_GROUPS;

  constructor(public store: Store<AppState>) {
    super(store);
  }

}

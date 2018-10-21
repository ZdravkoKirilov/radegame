import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormDefinition } from '@app/dynamic-forms';
import { formKeys, FormKey } from '../../state';
import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { composeEffectStackForm } from '../../forms';

@Component({
  selector: 'rg-effect-stacks',
  templateUrl: './effect-stacks.component.html',
  styleUrls: ['./effect-stacks.component.scss']
})
export class EffectStacksComponent extends SmartBase {

  formDefinition: FormDefinition = composeEffectStackForm;
  key: FormKey = formKeys.EFFECT_GROUPS;

  constructor(public store: Store<AppState>) {
    super(store);
  }

}

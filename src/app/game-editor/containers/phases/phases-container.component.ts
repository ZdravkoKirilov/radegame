import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { composePhaseForm } from '../../forms/phase';
import { formKeys, FormKey } from '../../state';

@Component({
  selector: 'rg-phases-container',
  template: `
  <rg-editor-layout>
      <rg-entity-view
          [formDefinition]="formDefinition"
          [items]="items$ | async"
          [showEditor]="showEditor$ | async"
          [selectedItem]="selectedItem$ | async"
          [connectedEntities]="connectedEntities$ | async"
          (toggleEditor)="toggleEditor($event)"
          (saveItem)="saveItem($event)"
          (editItem)="editItem($event)"
          (removeItem)="removeItem($event)">
      </rg-entity-view>
</rg-editor-layout>
  `,
  styles: []
})
export class PhasesContainerComponent extends SmartBase {
  formDefinition = composePhaseForm;
  readonly key = formKeys.phases as FormKey;

  constructor(public store: Store<AppState>) { super(store) }


}

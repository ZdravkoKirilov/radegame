import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { composePhaseForm } from '../../forms/phase';
import { formKeys } from '../../state';

@Component({
  selector: 'rg-phases-container',
  template: `
  <rg-entity-view
    [items]="items$ | async"
    [showEditor]="showEditor"
    [selectedItem]="selectedItem"
    [formDefinition]="formDefinition"
    [connectedEntities]="connectedEntities$ | async"
    (toggleEditor)="toggleEditor($event)"
    (editItem)="editItem($event)"
    (saveItem)="saveItem($event)"
    (removeItem)="removeItem($event)"
  ></rg-entity-view>
  `,
  styles: []
})
export class PhasesContainerComponent extends SmartBase {
  formDefinition = composePhaseForm;
  readonly key = formKeys.PHASES;

  constructor(public store: Store<AppState>) { super(store) }


}

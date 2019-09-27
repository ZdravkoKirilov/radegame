import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';
import { AppState } from '@app/core';
import { composePhaseForm } from '../../forms/phase';


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
  readonly key = ALL_ENTITIES.phases ;

  constructor(public store: Store<AppState>) { super(store) }


}

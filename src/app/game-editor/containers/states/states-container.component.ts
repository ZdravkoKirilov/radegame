import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';
import { AppState } from '@app/core';

import { composeStateForm } from '../../forms';

@Component({
  selector: 'rg-states-container',
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
export class StatesContainerComponent extends SmartBase {

  formDefinition = composeStateForm;
  readonly key = ALL_ENTITIES.states ;

  constructor(public store: Store<AppState>) { super(store) }

}

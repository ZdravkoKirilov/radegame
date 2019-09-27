import { Component } from '@angular/core';
import { composeHandlerForm } from '../../forms';

import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';

@Component({
  selector: 'rg-handlers-container',
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
export class HandlersContainerComponent extends SmartBase {

  formDefinition = composeHandlerForm;
  readonly key = ALL_ENTITIES.handlers ;

  constructor(public store: Store<AppState>) { super(store) }

}

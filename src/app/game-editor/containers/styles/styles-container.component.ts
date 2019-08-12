import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { formKeys, FormKey } from '../../state';
import { composeStyleForm } from '../../forms';

@Component({
  selector: 'rg-styles-container',
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
export class StylesContainerComponent extends SmartBase {

  formDefinition = composeStyleForm;
  readonly key = formKeys.styles ;

  constructor(public store: Store<AppState>) { super(store) }

}

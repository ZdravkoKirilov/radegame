import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { composeFieldForm } from '../../forms';
import { formKeys } from '../../state';

@Component({
  selector: 'rg-fields-container',
  template: `
  <rg-entity-view
      [items]="items$ | async"
      [showEditor]="showEditor"
      [selectedItem]="selectedItem"
      [connectedEntities]="connectedEntities$ | async"
      [formDefinition]="formDefinition"
      (toggleEditor)="toggleEditor($event)"
      (editItem)="editItem($event)"
      (saveItem)="saveItem($event)"
      (removeItem)="removeItem($event)"
  ></rg-entity-view>
  `,
  styles: []
})
export class FieldsContainerComponent extends SmartBase {

  formDefinition = composeFieldForm;
  readonly key = formKeys.FIELDS;

  constructor(public store: Store<AppState>) { super(store) }

}
